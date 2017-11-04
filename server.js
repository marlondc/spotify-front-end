const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

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

io.on('connection', function(client){

  client.on('playlist_change', function(data) {
    client.emit('get_playlist', data);
    client.broadcast.emit('get_playlist', data);
  });

});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
