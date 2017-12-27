const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const R = require('ramda');
const qs = require('qs');

dotenv.config();

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

let tracks = [];
let totalNumberOfTracks = 0;
let accessToken;
let refreshToken;
let poll;
polling = false;

io.on('connection', (socket) => {
  socket.on('get_playlist', ({ token, refresh, id }) => {
    accessToken = token;
    refreshToken = refresh;
    if (!polling) {
      polling = true;
      poll = setInterval(() => {
        axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }).then(({ data }) => {
          const { item } = data;
          track = tracks.filter((track) => track.id === item.id);
          const addedBy = track[0]
            ? track[0].addedBy
            : ''
          const song = {
            album: item.album.name,
            artist: item.artists[0].name,
            duration: item.duration_ms,
            id: item.id,
            image: item.album.images[0].url,
            isPlaying: data.is_playing,
            name: item.name,
            progress: data.progress_ms,
            addedBy,
          }
          io.sockets.emit('current_song', song);
        })
          .catch(err => console.log(err))
      }, 1000)
    }
      axios.get(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(({ data }) => {
        totalNumberOfTracks = data.tracks.items.length;
        const spotifyTracks = data.tracks.items.map((item) => {
          return {
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            id: item.track.id,
            image: item.track.album.images[0].url,
            name: item.track.name,
            addedBy: '',
          }
        });
        if (tracks.length === 0) {
          tracks = spotifyTracks
          io.sockets.emit('playlist_tracks', tracks);
        }
        const spotifyTrackNames = spotifyTracks.map(track => track.name);
        const currentTrackNames = tracks.map(track => track.name);
        if (tracks.length === spotifyTracks.length) {
          io.sockets.emit('playlist_tracks', tracks);
        } else if (tracks.length > spotifyTracks.length) {
          tracks = tracks.filter(track => spotifyTrackNames.indexOf(track.name) !== -1);
          io.sockets.emit('playlist_tracks', tracks);
        } else {
          const newTracks = spotifyTracks.filter(track => currentTrackNames.indexOf(track.name) !== -1);
          tracks = newTracks.map(track => tracks.push(newTrack));
          io.sockets.emit('playlist_tracks', tracks);
        }
      }).catch((err) => {
        io.sockets.emit('token_error', 'bad_token');
      });
  })

  socket.on('add_track', ({ trackId, id, token }) => {
    const spotifyRegex = /([a-z,A-Z,0-9]{22})/;
    const spotifyID = spotifyRegex.exec(trackId)[0];

    const query = qs.stringify({
      uris: `spotify:track:${spotifyID}`,
    })
    axios(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
    }).then(() => {
      axios(`https://api.spotify.com/v1/tracks/${spotifyID}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }).then(({ data }) => {
        tracks.push({
          artist: data.artists[0].name,
          album: data.album.name,
          id: data.id,
          image: data.album.images[0].url,
          name: data.name,
          addedBy: id,
        })
        io.sockets.emit('notification', {
          type: 'added track',
          text: data.name,
        });
        io.sockets.emit('playlist_tracks', tracks);
      }).catch((err) => console.log(err));
    }).catch((err) => {
      socket.emit('token_error', 'add track');
    });
  })

  socket.on('add_track_and_start_playback', ({ trackId, id, token }) => {
    const spotifyRegex = /([a-z,A-Z,0-9]{22})/;
    const spotifyID = spotifyRegex.exec(trackId)[0];
    console.log(token);
    const query = qs.stringify({
      uris: `spotify:track:${spotifyID}`,
    })
    axios(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
    }).then(() => {
      axios(`https://api.spotify.com/v1/tracks/${spotifyID}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }).then(({ data }) => {
        tracks.push({
          artist: data.artists[0].name,
          album: data.album.name,
          id: data.id,
          image: data.album.images[0].url,
          name: data.name,
          addedBy: id,
        })
        axios({
          method: 'put',
          url: 'https://api.spotify.com/v1/me/player/play',
          data: {
            context_uri: process.env.SPOTIFY_PLAYLIST_URI,
            offset: {
              position: totalNumberOfTracks,
            }
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }).then(() => {
          io.sockets.emit('notification', {
            type: 'added track',
            text: data.name,
          });
          io.sockets.emit('playlist_tracks', tracks);
        }).catch((err) => {
          io.sockets.emit('token_error', 'start_playback');
        })
      }).catch((err) => console.log(err));
    }).catch((err) => {
      console.log(err);
      socket.emit('token_error', 'add track');
    });
  })

  socket.on('remove_track', ({ trackId, userId, token }) => {
    const track = tracks.filter((track) => track.addedBy === userId);

    if (track.length > 0) {
      const trackToRemove = tracks.filter(playlistTrack => playlistTrack.id === trackId);
      tracks = tracks.filter(playlistTrack => (
        playlistTrack.id !== trackId
      ));
      axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`,
        data: {
          tracks: [
            {
              uri: `spotify:track:${trackId}`,
            }
          ]
        }
      }).then(() => {
        io.sockets.emit('playlist_tracks', tracks);
        io.sockets.emit('notification', {
          type: 'removed track',
          text: trackToRemove[0].name,
        });
      })
      .catch((err) => {
        io.sockets.emit('token_error', 'delete track');
      });
    }
  });

  socket.on('refresh_token', (refreshToken) => {
    const query = qs.stringify({
      refreshToken,
    });
    axios.get(`${process.env.BACKEND_URL}/refresh?${query}`)
      .then(({ data }) => {
        io.sockets.emit('new_access_token', data);
      })
      .catch((err) => io.sockets.emit('token_error', 'refresh error'));
  })

  socket.on('skip_current_track', (token) => {
    axios('https://api.spotify.com/v1/me/player/next', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
    }).then(() => {
      io.sockets.emit('notification', {
        type: 'track skipped',
        text: 'oh the SHAME!',
      })
    }).catch((err) => {
      console.log(err);
      io.sockets.emit('token_error', 'skip track')
    });
  })

  socket.on('disconnect', () => {
    if (io.engine.clientsCount === 0) {
      clearInterval(poll);
      polling = false;
    }
  })
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
