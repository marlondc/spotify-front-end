import {
  CLEAR_SEARCH_RESULTS,
  INVALID_TOKEN,
  RECEIVE_CURRENT_TRACK,
  RECEIVE_PLAYLIST,
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_TOKENS,
  RECEIVE_TOKENS_ERROR,
  REQUEST_TOKENS,
  UPDATE_ID,
  UPDATE_ACCESS_TOKEN,
} from '../actions/songs';

const initialState = {
  accessToken: null,
  refreshToken: null,
  tracks: [],
  currentTrack: {},
  id: '',
  loading: true,
  searchResults: [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {

  case INVALID_TOKEN: {
    return {
      ...state,
      accessToken: null,
    }
  }

  case CLEAR_SEARCH_RESULTS: {
    return {
      ...state,
      searchResults: [],
    }
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

  case RECEIVE_SEARCH_RESULTS: {
    const { searchResults } = action;
    return {
      ...state,
      searchResults,
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

  case UPDATE_ID: {
    const { id } = action;

    return {
      ...state,
      id,
    }
  }

  case UPDATE_ACCESS_TOKEN: {
    const { accessToken } = action;
    return {
      ...state,
      accessToken,
    }
  }

  default:
    return state;
  }
}
