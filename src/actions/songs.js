import axios from 'axios';
import qs from 'qs';
import { test, isEmpty } from 'ramda';

// our constants
export const BAD_TOKEN = 'BAD_TOKEN';
export const REQUEST_TOKENS = 'REQUEST_TOKENS'
export const RECEIVE_CURRENT_TRACK = 'RECEIVE_CURRENT_TRACK';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const RECEIVE_TOKENS = 'RECEIVE_TOKENS';
export const RECEIVE_TOKENS_ERROR = 'RECEIVE_TOKENS_ERROR';
export const UPDATE_ID = 'UPDATE_ID';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

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

export const updatePlaylist = tracks => ({
  type: RECEIVE_PLAYLIST,
  tracks,
})

export const clearInvalidTokens = () => ({
  type: BAD_TOKEN,
});

export const refreshTokens = data => ({
  type: RECEIVE_TOKENS,
  data,
})

export const updateCurrentSong = track => ({
  type: RECEIVE_CURRENT_TRACK,
  track,
})

export const updateId = id => ({
  type: UPDATE_ID,
  id,
})

export const updateAccessToken = accessToken => ({
  type: UPDATE_ACCESS_TOKEN,
  accessToken,
})
