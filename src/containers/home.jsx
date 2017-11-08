import { connect } from 'react-redux';
import { filter, isEmpty, equals, addIndex, map } from 'ramda';

import Page from '../components/page';
import {
  getTokens,
  updatePlaylist,
  clearInvalidTokens,
  refreshTokens,
  updateCurrentSong,
  updateId,
  updateAccessToken,
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
  getTokens: () => dispatch(getTokens()),
  updatePlaylist: tracks => dispatch(updatePlaylist(tracks)),
  clearInvalidTokens: () => dispatch(clearInvalidTokens()),
  refreshTokens: data => dispatch(refreshTokens(data)),
  updateCurrentSong: song => dispatch(updateCurrentSong(song)),
  updateId: id => dispatch(updateId(id)),
  updateAccessToken: token => dispatch(updateAccessToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
