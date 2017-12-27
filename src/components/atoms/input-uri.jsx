import React, { Component } from 'react';
import classnames from 'classnames';
import { test, isEmpty } from 'ramda';

import Track from './track';

class InputUri extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;

    this.setState({
      searchValue: value,
    });
  }

  handleInputSubmit(event) {
    event.preventDefault();
    const {
      searchForTrack,
    } = this.props
    const { searchValue } = this.state;
    if (!isEmpty(this.state.searchValue)) {
      searchForTrack(searchValue)
      this.setState({
        searchValue: '',
      })
    }
  }

  handleAddClick(trackId) {
    this.props.addToPlaylist(trackId);
  }

  render() {
    const { searchResults, isPlaying, cancelSearch } = this.props;
    return (
      <div className="input">
        <form onSubmit={this.handleInputSubmit}>
          <input
          autoComplete="off"
            className=" input__field input__spotifyURI"
            name="Search for a Track"
            onChange={this.handleInputChange}
            placeholder="Find a Track"
            type="text"
            value={this.state.searchValue}
          />
          <button
            className={
              classnames('input__button', { 'input__button--disabled': isEmpty(this.state.searchValue) })
            }
            type="submit"
          >
            Search
          </button>
          {
            !isEmpty(searchResults) && searchResults.map(track => (
              <div
                className={classnames("track track--in-list track__search", {
                  'track__search--start_play': !isPlaying,
                })}
                key={track.id}
                onClick={() => this.handleAddClick(track.id)}
              >
                <Track track={track} id={track.id} handleRemove={this.handleRemove} />
              </div>
            ))
          }
          {
            !isEmpty(searchResults) && <button type="submit" onClick={cancelSearch} className="input__cross" />
          }
        </form>
      </div>
    )
  }
}

export default InputUri;
