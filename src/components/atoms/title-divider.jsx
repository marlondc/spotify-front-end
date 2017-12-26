import React from 'react';

const TitleDivider = ({ titleText, currentTrackInPlaylist }) => (
  currentTrackInPlaylist
  ? <div className="title">
    <p className="title__text">{ titleText }</p>
    <div className="title__line"></div>
  </div>
  : <div className="title">
    <p className="title__text">Start Playlist</p>
    <div className="title__line"></div>
  </div>
);

export default TitleDivider;
