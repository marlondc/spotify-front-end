import {
  ADDED_TO_PLAYLIST,
  BAD_TOKEN,
  LOGGED_IN,
  RECEIVE_CURRENT_TRACK,
  RECEIVE_PLAYLIST,
  RECEIVE_TOKENS,
  RECEIVE_TOKENS_ERROR,
  REQUEST_CURRENT_TRACK,
  REQUEST_PLAYLIST,
  REQUEST_TOKENS,
  START_PLAYBACK,
} from '../actions/songs';

const initialState = {
  accessToken: null,
  currentTrack: false,
  logged_in: false,
  refreshToken: null,
  searchResults: [],
  tracks: [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {

  case ADDED_TO_PLAYLIST: {
    return {
      ...state,
      searchResults: [],
    }
  }

  case BAD_TOKEN: {
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
    }
  }

  case LOGGED_IN: {
    return {
      ...state,
      logged_in: true,
    }
  }

  case REQUEST_CURRENT_TRACK: {
    return state;
  }

  case REQUEST_PLAYLIST: {
    return state;
  }

  case REQUEST_TOKENS: {
    return state;
  }

  case RECEIVE_CURRENT_TRACK: {
    return {
      ...state,
      currentTrack: action.track,
    }
  }

  case RECEIVE_PLAYLIST: {
    const { tracks } = action;
    return {
      ...state,
      tracks,
    }
  }

  case RECEIVE_TOKENS: {
    const {
      accessToken,
      refreshToken,
    } = action.data;
    return {
      ...state,
      accessToken,
      loading: false,
      refreshToken,
    }
  }

  case RECEIVE_TOKENS_ERROR : {
    return state;
  }

  case START_PLAYBACK: {
    return state;
  }

  default:
    return state;
  }
}
