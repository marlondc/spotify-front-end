import React, { Component } from 'react';
import classnames from 'classnames';

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

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    const { accessToken } = this.props;
    this.props.getPlaylistTracks(accessToken);
    this.props.getCurrentTrack(accessToken);
  }

  componentDidMount() {
    const { accessToken } = this.props;
    setTimeout(() => (
      this.setState({
        loading: false,
      })
    ), 2000)
    this.infoInterval = setInterval(() => {
      this.props.getCurrentTrack(accessToken)
    }, 1000);
    this.playlistInterval = setInterval(() => {
      this.props.getPlaylistTracks(accessToken)
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.infoInterval);
    clearInterval(this.playlistInterval);
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
            <InputUri accessToken={accessToken} addToPlaylist={addToPlaylist}/>
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
                        : <StartButton clickHandler={() => startPlayback(accessToken, currentTrack.position)} />
                    }
                  </div>
                  : <div>
                    <p className="track__name">No currently playing track</p>
                    <StartButton clickHandler={() => startPlayback(accessToken, 0)} />
                  </div>
              }
            <TitleDivider titleText="Up next" />
            {
              tracks.map(track => (
                <div className="track track--in-list" key={track.id}>
                  <Track track={track} />
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
