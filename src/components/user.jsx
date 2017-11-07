import React, { Component } from 'react';
import classnames from 'classnames';
import io from 'socket.io-client';

import Loader from './atoms/loader';
import Track from './atoms/track';
import TitleDivider from './atoms/title-divider';
import TrackStatus from './atoms/track-status';
import StartButton from './atoms/start-button';
import TopDecoration from './atoms/top-decoration';
import InputUri from './atoms/input-uri';
import Modal from './atoms/modal';
import Notification from './atoms/notification';

import firstInstruction from '../images/first.png';
import secondInstruction from '../images/second.png';
import thirdInstruction from '../images/third.png';

const socket = io();

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      id: '',
    }

    this.addTrack = this.addTrack.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleStartPlayback = this.handleStartPlayback.bind(this);
  }

  componentWillMount() {
    const { accessToken, refreshToken } = this.props;

    socket.emit('get_playlist', {
      token: accessToken,
      refresh: refreshToken,
    });

    socket.on('joined', id => {
      this.setState({
        id,
      })
    });

    socket.on('bad_token', () => {
      socket.emit('get_playlist', accessToken);
    })
    
    socket.on('tokens', ({ token, refresh }) => {
      this.props.refreshTokens({
        accessToken: token,
        refreshToken: refresh,
      })
    })
    
    socket.on('playlist_tracks', (tracks) => {
      this.props.updatePlaylist(tracks)
      this.setState({
        loading: false,
      })
    })

    socket.on('token_error', (data) => {
      this.props.clearInvalidTokens();
    })

    socket.on('current_song', (song) => {
      this.props.updateCurrentSong(song);
    })
  }

  addTrack(spotifyUri) {
    socket.emit('add_track', {
      spotifyUri,
      id: this.state.id,
      token: this.props.accessToken,
    });
  }

  handleRemove(trackId) {
    socket.emit('remove_track', ({
      trackId,
      userId: this.state.id,
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

  render() {
    const {
      accessToken,
      clearNotification,
      currentTrack,
      tracks,
      startPlayback,
      addToPlaylist,
      notification,
    } = this.props;

    if (this.state.loading) {
      return (
        <Loader />
      );
    }

    return (
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
                        : <StartButton clickHandler={this.handleStartPlayback} id={this.state.id} />
                    }
                  </div>
                  : <div>
                    <p className="track__name">No currently playing track</p>
                    <StartButton clickHandler={this.handleStartPlayback} id={this.state.id} />
                  </div>
              }
            <TitleDivider titleText="Up next" />
            {
              tracks.map(track => (
                <div className="track track--in-list" key={track.id}>
                  <Track track={track} id={this.state.id} handleRemove={this.handleRemove} />
                </div>
              ))
            }
          </div>
        </div>
        <Notification {...notification} clearNotification={() => clearNotification()}/>
      </div>
    );
  }
}

User.defaultProps = {
  tracks: [],
  searchResults: [],
}

export default User;
