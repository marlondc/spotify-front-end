const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const R = require('ramda');
const qs = require('qs');

dotenv.config();

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

let tracks = [];
let accessToken;
let refreshToken;

io.on('connection', (socket) => {
  socket.emit('joined', socket.id);

  socket.on('get_playlist', token => {
    axios.get(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(({ data }) => {
      tracks = data.tracks.items.map((item) => {
        return {
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          id: item.track.id,
          image: item.track.album.images[0].url,
          name: item.track.name,
          addedBy: '',
        }
      });
      socket.emit('playlist_tracks', tracks);
      socket.broadcast.emit('playlist_tracks', tracks);
    }).catch((err) => {
      socket.emit('error', 'bad_token');
      socket.broadcast.emit('error', 'bad_token');
    });
  })

  socket.on('add_track', ({ spotifyUri, id, token }) => {
    const spotifyRegex = /([a-z,A-Z,0-9]{22})$/;
    const spotifyID = spotifyRegex.exec(spotifyUri)[1];
    const query = qs.stringify({
      uris: spotifyUri,
    })
    axios(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?${query}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
    }).then(() => {
      axios(`https://api.spotify.com/v1/tracks/${spotifyID}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }).then(({ data }) => {
        tracks.push({
          artist: data.artists[0].name,
          album: data.album.name,
          id: data.id,
          image: data.album.images[0].url,
          name: data.name,
          addedBy: id,
        })
        socket.emit('playlist_tracks', tracks);
        socket.broadcast.emit('playlist_tracks', tracks);
      }).catch((err) => console.log(err));
    }).catch((err) => {
      console.log(err);
      socket.emit('error', 'add track');
    });
  })

  socket.on('remove_track', ({ trackId, userId, token }) => {
    const track = tracks.filter((track) => track.addedBy === userId);
    
    if (track.length === 1) {
      tracks = tracks.filter(playlistTrack => (
        playlistTrack.id !== trackId
      ));
      axios({
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_NAME}/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`,
        data: {
          tracks: [
            {
              uri: `spotify:track:${trackId}`,
            }
          ]
        }
      }).then(() => {
        socket.emit('playlist_tracks', tracks);
        socket.broadcast.emit('playlist_tracks', tracks);
      })
      .catch((err) => {
        socket.emit('error', 'delete track');
        socket.broadcast.emit('error', 'delete track');
      });
    }
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
