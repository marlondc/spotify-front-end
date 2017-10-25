import React from 'react';

const timeLeft = (track) => {
  const millis = track.duration - track.progress;
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const TrackStatus = ({ track }) => (
  <div className="track__status">
    <div className="track__status__progress-bar"></div>
    <div
      className="track__status__progress-bar track__status__progress-bar--fill"
      style={
        {
          width: track.progress / track.duration * 75 > 5
            ? `${track.progress / track.duration * 75}%`
            : '2%'
        }
      }
    />
    <p className="track__status__time">{timeLeft(track)} <span>left</span></p>
  </div>
);

export default TrackStatus;
