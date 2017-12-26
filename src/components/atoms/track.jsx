import React from 'react';
import classnames from 'classnames';
import { isEmpty, isNil } from 'ramda';

const Track = () => <div>Track</div>
// const Track = ({ track, id, handleRemove }) => (
//   <div className="track">
//     <img 
//       src={track.image}
//       alt={track.album}
//       className="track__image"
//     />
//     <div className="track__details">
//       {
//         track.name.length > 17
//           ? <div className="track__marquee">
//             <p className="track__name">{track.name}</p>
//           </div>
//           : <p className="track__name">{track.name}</p>
//       }
//       {
//         track.artist.length > 25
//           ? <div className="track__marquee">
//             <p className="track__artist">{track.artist}</p>
//           </div>
//           : <p className="track__artist">{track.artist}</p>
//       }
//       {
//         track.album.length > 22
//           ? <div className="track__marquee">
//             <p className="track__album">{track.album}</p>
//           </div>
//           : <p className="track__album">{track.album}</p>
//       }
//     </div>
//     {
//       (track.addedBy === id && !isEmpty(track.addedBy) && !isNil(track.addedBy))
//         ? <button
//           onClick={() => handleRemove(track.id)}
//           className="track__remove jukebox-cancel"
//         />
//         : null
//     }
//   </div>
// );

export default Track;
