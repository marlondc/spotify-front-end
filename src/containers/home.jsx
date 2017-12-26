import { connect } from 'react-redux';
import { filter, isEmpty, equals, addIndex, map, indexOf, contains } from 'ramda';

import Page from '../components/page';
import {
  clearSearchResults,
  getTokens,
  updatePlaylist,
  invalidToken,
  refreshTokens,
  updateCurrentSong,
  updateId,
  updateAccessToken,
  searchForTrack,
 } from '../actions/songs';

const mapIndexed = addIndex(map);

const mapStateToProps = ({ songs }) => {
  const { tracks, currentTrack } = songs;

  const indexedTracks = mapIndexed((track, index) => ({
    ...track,
    position: index,
  }), tracks);

  const trackIds = map(track => track.id, tracks)

  const filterIndexedTracks = indexedTracks.filter(track => (
    track.id !== currentTrack.id
  ));

  const filteredPlaylistTracks = indexedTracks.filter(track => (
    track.position > indexOf(currentTrack.id, trackIds)
  ));

  return {
    ...songs,
    currentTrack,
    currentTrackInPlaylist: contains(currentTrack, tracks),
    tracks: filteredPlaylistTracks,
  }
};

const mapDispatchToProps = dispatch => ({
  getTokens: () => dispatch(getTokens()),
  updatePlaylist: tracks => dispatch(updatePlaylist(tracks)),
  invalidToken: () => dispatch(invalidToken()),
  refreshTokens: data => dispatch(refreshTokens(data)),
  searchForTrack: ({ query, accessToken }) => dispatch(searchForTrack({ query, accessToken })),
  updateCurrentSong: song => dispatch(updateCurrentSong(song)),
  updateId: id => dispatch(updateId(id)),
  updateAccessToken: token => dispatch(updateAccessToken(token)),
  clearSearchResults: () => dispatch(clearSearchResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
