import axios from 'axios';
import qs from 'qs';
import { test, isEmpty } from 'ramda';

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

export const clearNotification = () => (dispatch) => (
  dispatch({
    type: CLEAR_NOTIFICATION,
  })
);

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

// new

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
