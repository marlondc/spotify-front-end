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
    const { searchResults } = this.props;
    return (
      <div className="input">
        <form onSubmit={this.handleInputSubmit}>
          <input
            type="text"
            name="Search for a Track"
            placeholder="Find a Track"
            value={this.state.searchValue}
            className=" input__field input__spotifyURI"
            onChange={this.handleInputChange}
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
              <div className="track track--in-list track--search" key={track.id} onClick={() => this.handleAddClick(track.id)}>
                <Track track={track} id={track.id} handleRemove={this.handleRemove} />
              </div>
            ))
          }
        </form>
      </div>
    )
  }
}

export default InputUri;
