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

const mapIndexed = addIndex(map);

const mapStateToProps = ({ songs }) => {
  const { tracks, currentTrack } = songs;

  const indexedTracks = mapIndexed((track, index) => ({
    ...track,
    position: index,
  }), tracks);
  const filterIndexedTracks = indexedTracks.filter(track => (
    track.id === currentTrack.id
  ))

  const newCurrentTrack = currentTrack.isPlaying
    ? {
      ...currentTrack,
      position: filterIndexedTracks[0].position,
    }
    : false;
  const filteredPlaylistTracks = indexedTracks.filter(track => (
    track.id !== currentTrack.id &&
    newCurrentTrack &&
    track.position > newCurrentTrack.position
  ))

  return {
    ...songs,
    currentTrack: newCurrentTrack,
    tracks: filteredPlaylistTracks,
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
