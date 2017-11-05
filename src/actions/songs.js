import axios from 'axios';
import qs from 'qs';
import { test, isEmpty } from 'ramda';
import io from 'socket.io-client';

// our constants
export const ADDED_TO_PLAYLIST = 'ADDED_TO_PLAYLIST';
export const BAD_TOKEN = 'BAD_TOKEN';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const LOGGED_IN = 'LOGGED_IN';
export const REQUEST_CURRENT_TRACK = 'REQUEST_CURRENT_TRACK';
export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const REQUEST_TOKENS = 'REQUEST_TOKENS'
export const RECEIVE_CURRENT_TRACK = 'RECEIVE_CURRENT_TRACK';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const RECEIVE_TOKENS = 'RECEIVE_TOKENS';
export const RECEIVE_TOKENS_ERROR = 'RECEIVE_TOKENS_ERROR';
export const START_PLAYBACK = 'START_PLAYBACK';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

const socket = io();

socket.on('connnection', () => (
  console.log('connected')
))

socket.on('get_playlist', (data) => {
  console.log(data);
})

export const addToPlaylist = (url, accessToken) => (dispatch) => {
  const spotifyRegex = /([a-z,A-Z,0-9]{22})$/;
  const spotifyID = spotifyRegex.exec(url)[1];
  if (test(/track/, url)) {
    const query = qs.stringify({
      uris: url,
    })
    axios(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      },
    }).then(() => {
      dispatch(getPlaylistTracks(accessToken));
    }).then(() => {
      axios(`https://api.spotify.com/v1/tracks/${spotifyID}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      }).then(({ data }) => {
        dispatch({
          type: SHOW_NOTIFICATION,
          notification: {
            text: `${data.name} by ${data.artists[0].name}`,
            type: 'track',
          },
        })
      });
    }).catch((err) => {
      dispatch({
        type: ADDED_TO_PLAYLIST,
      });
    });
  } else {
    axios.get(`https://api.spotify.com/v1/albums/${spotifyID}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      }
    }).then(({ data }) => {
      const tracks = data.items.map(item => item.uri).join(',');
      const query = qs.stringify({
        uris: tracks,
      })
      axios(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        },
      }).then(() => {
        dispatch({
          type: ADDED_TO_PLAYLIST,
        });
        dispatch(getPlaylistTracks(accessToken));
      }).then(() => {
        axios(`https://api.spotify.com/v1/albums/${spotifyID}`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        }).then(({ data }) => {
          dispatch({
            type: SHOW_NOTIFICATION,
            notification: {
              text: `${data.name} by ${data.artists[0].name}`,
              type: 'album',
            },
          })
        });
      }).catch((err) => {
        dispatch({ type: ADDED_TO_PLAYLIST })
      })
    });
  }
}

export const clearNotification = () => (dispatch) => (
  dispatch({
    type: CLEAR_NOTIFICATION,
  })
);

export const getCurrentTrack = (accessToken) => (dispatch) => {
  dispatch({
    type: REQUEST_CURRENT_TRACK,
  });
  axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }).then(({data}) => {
    if (isEmpty(data)) {
      return dispatch({
        type: RECEIVE_CURRENT_TRACK,
        track: {},
      })
    }
    const { item } = data;
    dispatch({
      type: RECEIVE_CURRENT_TRACK,
      track: {
        album: item.album.name,
        artist: item.artists[0].name,
        duration: item.duration_ms,
        id: item.id,
        image: item.album.images[0].url,
        isPlaying: data.is_playing,
        name: item.name,
        progress: data.progress_ms,
      }
    })
  }).catch((err) => {
    dispatch({ type: BAD_TOKEN })
  })
}

export const getPlaylistTracks = (accessToken) => (dispatch) => {
  dispatch({
    type: REQUEST_PLAYLIST,
  })

  return axios.get(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }).then(({ data }) => {
    const tracks = data.tracks.items.map((item) => {
      return {
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        id: item.track.id,
        image: item.track.album.images[0].url,
        name: item.track.name,
      }
    });
    socket.emit('playlist_change', tracks);
    dispatch({
      type: RECEIVE_PLAYLIST,
      tracks,
    })
  }).catch(err => {
    console.log(err);
  });
}

export const getTokens = () => (dispatch) => {
  dispatch({
    type: REQUEST_TOKENS,
  });
  axios
    .get(`${process.env.BACKEND_LOGIN}/tokens`)
    .then((response) => {
      dispatch({
        type: RECEIVE_TOKENS,
        data: response.data
      })
    })
    .catch(() => {
      dispatch({
        type: RECEIVE_TOKENS_ERROR,
      })
    })
}

export const login = () => {
  return {
    type: LOGGED_IN,
  }
};

export const startPlayback = (accessToken, position) => (dispatch) => {
  dispatch({
    type: START_PLAYBACK,
  })
  axios({
    method: 'put',
    url: 'https://api.spotify.com/v1/me/player/play',
    data: {
      context_uri: process.env.SPOTIFY_PLAYLIST_URI,
      offset: {
        position,
      }
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }).then(() => {
    setTimeout(() => (
      dispatch(getCurrentTrack(accessToken))
    ), 500)
  }).catch((err) => {
    console.log(err)
  })
}
