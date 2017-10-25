import React, { Component } from 'react';
import classnames from 'classnames';

import Loader from './atoms/loader';
import Track from './atoms/track';
import TitleDivider from './atoms/title-divider';
import TrackStatus from './atoms/track-status';
import StartButton from './atoms/start-button';
import TopDecoration from './atoms/top-decoration';
import InputUri from './atoms/input-uri';

import firstInstruction from '../images/first.png';
import secondInstruction from '../images/second.png';
import thirdInstruction from '../images/third.png';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spotifyURI: '',
      showModal: false,
      loading: true,
    }

    this.handleModal = this.handleModal.bind(this);
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
    this.currentTrackInterval = setInterval(() => (
      this.props.getCurrentTrack(accessToken)
    ), 1000);
    this.currentPlaylistTracks = setInterval(() => (
      this.props.getPlaylistTracks()
    ), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.currentTrackInterval);
    clearInterval(this.currentPlaylistTracks);
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const {
      accessToken,
      currentTrack,
      tracks,
      startPlayback,
      addToPlaylist,
    } = this.props;

    const {
      spotifyURI,
      showModal
    } = this.state

    if (this.state.loading) {
      return (
        <Loader />
      );
    }

    return (
      <div className="container">
        <div className={classnames({
          'fixed-height': showModal,
        })}>
          <div className="top">
            <div className="content">
              <TopDecoration />
              <InputUri accessToken={accessToken} addToPlaylist={addToPlaylist}/>
              <div className="info">
                <button onClick={this.handleModal} className="info__text">How do I find a Spotify URI?</button>
              </div>
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
        </div>
        <div className={classnames('info__modal', { 'info__modal--show': showModal })}>
          <div className="info__modal__content">
            <div className="info__modal__cross" onClick={this.handleModal} >
              <svg className="cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="cross__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
                <path className="cross__path cross__path--right" fill="none" d="M16,36 l20,-20" />
              </svg>
            </div>
            <div className="info__modal__image">
              <img src={firstInstruction} alt="Instruction 1" />
            </div>
            <div className="info__modal__image" >
              <img src={secondInstruction} alt="Instruction 2" />
            </div>
            <div className="info__modal__image">
              <img src={thirdInstruction} alt="Instruction 3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

User.defaultProps = {
  tracks: [],
  searchResults: [],
}

export default User;
