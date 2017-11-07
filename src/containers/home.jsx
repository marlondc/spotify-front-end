import { connect } from 'react-redux';
import { filter, isEmpty, equals, addIndex, map } from 'ramda';

import Page from '../components/page';
import {
  clearNotification,
  getCurrentTrack,
  getPlaylistTracks,
  getTokens,
  login,
  startPlayback,
  // new
  updatePlaylist,
  clearInvalidTokens,
  refreshTokens,
 } from '../actions/songs';

const mapStateToProps = ({ songs }) => {
  let displayCurrentTrack;
  const mapIndexed = addIndex(map);
  const indexedTracks = mapIndexed((track, index) => ({
    ...track,
    position: index,
  }), songs.tracks)
  const filteredTracks = filter(track => (
    equals(track.id, songs.currentTrack.id)
  ), indexedTracks);

  displayCurrentTrack = isEmpty(filteredTracks)
    ? false
    : {
      ...songs.currentTrack,
      position: filteredTracks[0].position
    };

  const displayPlaylistTracks = filter((track) => (
    displayCurrentTrack.position < track.position
  ), indexedTracks)

  return {
    ...songs,
    currentTrack: displayCurrentTrack,
    tracks: isEmpty(displayPlaylistTracks) && !displayCurrentTrack
      ? songs.tracks
      : displayPlaylistTracks,
  }
};

const mapDispatchToProps = dispatch => ({
  clearNotification: () => dispatch(clearNotification()),
  getCurrentTrack: accessToken => dispatch(getCurrentTrack(accessToken)),
  getPlaylistTracks: accessToken => dispatch(getPlaylistTracks(accessToken)),
  getTokens: () => dispatch(getTokens()),
  login: () => login(),
  startPlayback: (accessToken, position) => dispatch(startPlayback(accessToken, position)),
  // new
  updatePlaylist: tracks => dispatch(updatePlaylist(tracks)),
  clearInvalidTokens: () => dispatch(clearInvalidTokens()),
  refreshTokens: (data) => dispatch(refreshTokens(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
