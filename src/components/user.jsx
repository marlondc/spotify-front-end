import React, { Component } from 'react';
import classnames from 'classnames';
import io from 'socket.io-client';
import uuid from 'uuid';
import { isNil, isEmpty } from 'ramda';
import axios from 'axios';

import Loader from './atoms/loader';
import Track from './atoms/track';
import TitleDivider from './atoms/title-divider';
import TrackStatus from './atoms/track-status';
import StartButton from './atoms/start-button';
import TopDecoration from './atoms/top-decoration';
import InputUri from './atoms/input-uri';
import Notification from './atoms/notification';

const socket = io();

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      notification: {
        type: '',
        text: '',
      },
      validAccessToken: false,
    }

    this.props.updateId(uuid());

    this.addTrack = this.addTrack.bind(this);
    this.searchForTrack = this.searchForTrack.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRefreshToken = this.handleRefreshToken.bind(this);
    this.skipCurrentSong = this.skipCurrentSong.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
  }

  componentWillMount() {
    const { accessToken, refreshToken } = this.props;
    socket.emit('get_playlist', {
      token: accessToken,
      refresh: refreshToken,
    });
    
    socket.on('playlist_tracks', (tracks) => {
      this.props.updatePlaylist(tracks)
      setTimeout(() => {
        this.setState({
          loading: false,
          validAccessToken: true,
        })
      }, 1500);
    })

    socket.on('token_error', (data) => {
      this.setState({
        validAccessToken: false,
        loading: false,
      });
    })

    socket.on('current_song', (song) => {
      this.props.updateCurrentSong(song);
    })

    socket.on('notification', ({ type, text }) => {
      this.setState({
        notification: {
          type,
          text,
        }
      })
      setTimeout(() => {
        this.setState({
          notification: {
            type: '',
            text: '',
          }
        })
      }, 1000);
    })

    socket.on('new_access_token', (access_token) => {
      this.setState({
        validAccessToken: true,
      })
      socket.emit('get_playlist', {
        token: access_token,
        refresh: this.props.refreshToken,
      });
      this.props.updateAccessToken(access_token);
    })
  }

  searchForTrack(query) {
    this.props.searchForTrack({
      query,
      accessToken: this.props.accessToken,
    });
  }

  addToPlaylist(trackId) {
    const {
      clearSearchResults,
      currentTrack,
    } = this.props;
    clearSearchResults();
    if (isEmpty(currentTrack) || !currentTrack.isPlaying) {
      socket.emit('add_track_and_start_playback', {
        trackId,
        id: this.props.id,
        token: this.props.accessToken,
      })
    } else {
      socket.emit('add_track', {
        trackId,
        id: this.props.id,
        token: this.props.accessToken,
      })
    }
  }

  addTrack(spotifyUri) {
    if (this.props.tracks.length === 0 && !this.props.currentTrack) {
      socket.emit('add_track_and_start_playback', {
        spotifyUri,
        id: this.props.id,
        token: this.props.accessToken,
      })
    } else {
      socket.emit('add_track', {
        spotifyUri,
        id: this.props.id,
        token: this.props.accessToken,
      });
    }
  }

  cancelSearch() {
    this.props.clearSearchResults();
  }

  handleRemove(trackId) {
    socket.emit('remove_track', ({
      trackId,
      userId: this.props.id,
      token: this.props.accessToken,
    }));
  }

  skipCurrentSong() {
    socket.emit('skip_current_track', this.props.accessToken);
  }

  handleRefreshToken() {
    const { refreshToken } = this.props;
    socket.emit('refresh_token', refreshToken)
  }

  render() {
    const {
      accessToken,
      currentTrack,
      tracks,
      id,
      currentTrackInPlaylist,
      searchResults,
    } = this.props;

    const {
      notification,
      validAccessToken,
    } = this.state;

    if (this.state.loading) {
      return (
        <Loader />
      );
    }
    return (
      validAccessToken
        ? (
          <div className="container">
            <div className="top">
              <div className="content">
                <TopDecoration />
                <InputUri
                  accessToken={accessToken}
                  searchForTrack={this.searchForTrack}
                  addToPlaylist={this.addToPlaylist}
                  currentTrack={currentTrack}
                  searchResults={searchResults}
                  isPlaying={currentTrack.isPlaying}
                  cancelSearch={this.cancelSearch}
                />
              </div>
            </div>
            <div className="bottom">
              <div className="content">
                  {
                    !isEmpty(currentTrack)
                    ? <div>
                        <TitleDivider titleText="Current track" currentTrackInPlaylist />
                        <div className="track track--current">
                          <Track track={currentTrack} id={isEmpty(tracks) ? 'null' : id} handleRemove={isEmpty(tracks) ? null : this.skipCurrentSong}/>
                        </div>
                        {
                          currentTrack.isPlaying
                            ? <TrackStatus track={currentTrack} />
                            : null
                        }
                      </div>
                      : null
                  }
                {
                  tracks.length > 0
                  ? <div>
                    <TitleDivider titleText="Up next" currentTrackInPlaylist={currentTrackInPlaylist} />
                    {
                      tracks.map(track => (
                        <div className="track track--in-list" key={track.id}>
                          <Track track={track} id={track.id} handleRemove={this.handleRemove} />
                        </div>
                      ))
                    }
                  </div>
                    : null
                }
              </div>
            </div>
            <Notification type={notification.type} text={notification.text} />
          </div>
        )
        : <div className="container">
          <div className="top top--login">
            <div className="content content--login">
              <div className="input input--login">
                <button
                  onClick={this.handleRefreshToken}
                  className="input__button input__button--login"
                >
                  REFRESH
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

User.defaultProps = {
  tracks: [],
  searchResults: [],
}

export default User;
