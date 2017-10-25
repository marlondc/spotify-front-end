import React, { Component } from 'react';
import classnames from 'classnames';
import { test } from 'ramda';

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
        <input
          type="text"
          name="spotifyURI"
          className="input__spotifyURI"
          value={this.state.spotifyURI}
          placeholder="Add spotify track / album uri ..."
          onChange={this.handleInputChange}
        />
        <input
          type="submit"
          value="Add to playlist"
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
