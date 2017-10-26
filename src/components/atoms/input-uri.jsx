import React, { Component } from 'react';
import classnames from 'classnames';
import { test, isEmpty } from 'ramda';

const invalidURI = (uri) => {
  const spotifyRegex = /^spotify:(track|album):([a-z,A-Z,0-9]{22})$/;
  return !test(spotifyRegex, uri)
}

class InputUri extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spotifyURI: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;

    this.setState({
      spotifyURI: value
    });
  }

  handleSubmit() {
    const {
      accessToken,
      addToPlaylist,
    } = this.props
    const { spotifyURI } = this.state;
    if (!invalidURI(spotifyURI)) {
      addToPlaylist(spotifyURI, accessToken)
      this.setState({
        spotifyURI: '',
      })
    }
  }

  render() {
    return (
      <div className="input">
        <div className="input__field">
          <input
            type="text"
            name="spotifyURI"
            className="input__spotifyURI"
            value={this.state.spotifyURI}
            placeholder="Add spotify track / album uri ..."
            onChange={this.handleInputChange}
          />
          <span
            className={
              classnames('jukebox-ok', 'input__tick', {
                'input__tick--show': !invalidURI(this.state.spotifyURI),
              })
            }
          />
          <span
            className={
              classnames('jukebox-cancel', 'input__cancel', {
                'input__cancel--show': invalidURI(this.state.spotifyURI) && !isEmpty(this.state.spotifyURI),
              })
            }
          />
        </div>
        <input
          type="submit"
          value="ADD TO PLAYLIST"
          className={
            classnames('input__button', { 'input__button--disabled': invalidURI(this.state.spotifyURI) })
          }
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default InputUri;
