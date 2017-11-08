import React, { Component } from 'react';
import classnames from 'classnames';
import io from 'socket.io-client';
import uuid from 'uuid';

import Loader from './atoms/loader';
import Track from './atoms/track';
import TitleDivider from './atoms/title-divider';
import TrackStatus from './atoms/track-status';
import StartButton from './atoms/start-button';
import TopDecoration from './atoms/top-decoration';
import InputUri from './atoms/input-uri';
import Modal from './atoms/modal';
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
    this.handleRemove = this.handleRemove.bind(this);
    this.handleStartPlayback = this.handleStartPlayback.bind(this);
    this.handleRefreshToken = this.handleRefreshToken.bind(this);
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
      }, 2000);
    })

    socket.on('new_access_token', ({ access_token }) => {
      this.props.updateAccessToken(access_token);
    })
  }

  addTrack(spotifyUri) {
    socket.emit('add_track', {
      spotifyUri,
      id: this.props.id,
      token: this.props.accessToken,
    });
  }

  handleRemove(trackId) {
    socket.emit('remove_track', ({
      trackId,
      userId: this.props.id,
      token: this.props.accessToken,
    }));
  }

  handleStartPlayback() {
    const playPosition = this.props.currentTrack.position
      ? this.props.currentTrack.position
      : 0
    socket.emit('start_playback', {
      token: this.props.accessToken,
      position: playPosition,
    });
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
                <InputUri accessToken={accessToken} addToPlaylist={this.addTrack}/>
                <Modal />
              </div>
            </div>
            <div className="bottom">
              <div className="content">
                <TitleDivider titleText="Currently playing" />
                  {
                    currentTrack
                      ? <div>
                        <div className="track track--current">
                          <Track track={currentTrack} />
                        </div>
                        {
                          currentTrack.isPlaying
                            ? <TrackStatus track={currentTrack} />
                            : <StartButton clickHandler={this.handleStartPlayback} />
                        }
                      </div>
                      : <div>
                        <p className="track__name">No currently playing track</p>
                        <StartButton clickHandler={this.handleStartPlayback} />
                      </div>
                  }
                {
                  tracks.length > 0
                  ? <div>
                    <TitleDivider titleText="Up next" />
                    {
                      tracks.map(track => (
                        <div className="track track--in-list" key={track.id}>
                          <Track track={track} id={this.props.id} handleRemove={this.handleRemove} />
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
