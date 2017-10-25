import React from 'react';
import classnames from 'classnames';

const Track = ({ track }) => (
  <div>
    <img src={track.image} alt={track.album} className="track__image" />
    <div className="track__details">
      {
        track.name.length > 17
          ? <div className="track__marquee">
            <p className="track__name">{track.name}</p>
          </div>
          : <p className="track__name">{track.name}</p>
      }
      {
        track.artist.length > 30
          ? <div className="track__marquee">
            <p className="track__artist">{track.artist}</p>
          </div>
          : <p className="track__artist">{track.artist}</p>
      }
      {
        track.album.length > 22
          ? <div className="track__marquee">
            <p className="track__album">{track.album}</p>
          </div>
          : <p className="track__album">{track.album}</p>
      }
    </div>
  </div>
);

export default Track;
