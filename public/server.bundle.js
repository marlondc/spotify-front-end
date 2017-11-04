/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = __webpack_require__(3);

var _ramda = __webpack_require__(1);

var _page = __webpack_require__(17);

var _page2 = _interopRequireDefault(_page);

var _songs = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var songs = _ref.songs;

  var displayCurrentTrack = void 0;
  var mapIndexed = (0, _ramda.addIndex)(_ramda.map);
  var indexedTracks = mapIndexed(function (track, index) {
    return _extends({}, track, {
      position: index
    });
  }, songs.tracks);
  var filteredTracks = (0, _ramda.filter)(function (track) {
    return (0, _ramda.equals)(track.id, songs.currentTrack.id);
  }, indexedTracks);

  displayCurrentTrack = (0, _ramda.isEmpty)(filteredTracks) ? false : _extends({}, songs.currentTrack, {
    position: filteredTracks[0].position
  });

  var displayPlaylistTracks = (0, _ramda.filter)(function (track) {
    return displayCurrentTrack.position < track.position;
  }, indexedTracks);

  return _extends({}, songs, {
    currentTrack: displayCurrentTrack,
    tracks: (0, _ramda.isEmpty)(displayPlaylistTracks) && !displayCurrentTrack ? songs.tracks : displayPlaylistTracks
  });
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addToPlaylist: function addToPlaylist(url, accessToken) {
      return dispatch((0, _songs.addToPlaylist)(url, accessToken));
    },
    clearNotification: function clearNotification() {
      return dispatch((0, _songs.clearNotification)());
    },
    getCurrentTrack: function getCurrentTrack(accessToken) {
      return dispatch((0, _songs.getCurrentTrack)(accessToken));
    },
    getPlaylistTracks: function getPlaylistTracks(accessToken) {
      return dispatch((0, _songs.getPlaylistTracks)(accessToken));
    },
    getTokens: function getTokens() {
      return dispatch((0, _songs.getTokens)());
    },
    login: function login() {
      return (0, _songs.login)();
    },
    startPlayback: function startPlayback(accessToken, position) {
      return dispatch((0, _songs.startPlayback)(accessToken, position));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_page2.default);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/first.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/second.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/images/third.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startPlayback = exports.login = exports.getTokens = exports.getPlaylistTracks = exports.getCurrentTrack = exports.clearNotification = exports.addToPlaylist = exports.SHOW_NOTIFICATION = exports.START_PLAYBACK = exports.RECEIVE_TOKENS_ERROR = exports.RECEIVE_TOKENS = exports.RECEIVE_PLAYLIST = exports.RECEIVE_CURRENT_TRACK = exports.REQUEST_TOKENS = exports.REQUEST_PLAYLIST = exports.REQUEST_CURRENT_TRACK = exports.LOGGED_IN = exports.CLEAR_NOTIFICATION = exports.BAD_TOKEN = exports.ADDED_TO_PLAYLIST = undefined;

var _axios = __webpack_require__(29);

var _axios2 = _interopRequireDefault(_axios);

var _qs = __webpack_require__(30);

var _qs2 = _interopRequireDefault(_qs);

var _ramda = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// our constants
var ADDED_TO_PLAYLIST = exports.ADDED_TO_PLAYLIST = 'ADDED_TO_PLAYLIST';
var BAD_TOKEN = exports.BAD_TOKEN = 'BAD_TOKEN';
var CLEAR_NOTIFICATION = exports.CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
var LOGGED_IN = exports.LOGGED_IN = 'LOGGED_IN';
var REQUEST_CURRENT_TRACK = exports.REQUEST_CURRENT_TRACK = 'REQUEST_CURRENT_TRACK';
var REQUEST_PLAYLIST = exports.REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
var REQUEST_TOKENS = exports.REQUEST_TOKENS = 'REQUEST_TOKENS';
var RECEIVE_CURRENT_TRACK = exports.RECEIVE_CURRENT_TRACK = 'RECEIVE_CURRENT_TRACK';
var RECEIVE_PLAYLIST = exports.RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
var RECEIVE_TOKENS = exports.RECEIVE_TOKENS = 'RECEIVE_TOKENS';
var RECEIVE_TOKENS_ERROR = exports.RECEIVE_TOKENS_ERROR = 'RECEIVE_TOKENS_ERROR';
var START_PLAYBACK = exports.START_PLAYBACK = 'START_PLAYBACK';
var SHOW_NOTIFICATION = exports.SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

var addToPlaylist = exports.addToPlaylist = function addToPlaylist(url, accessToken) {
  return function (dispatch) {
    var spotifyRegex = /([a-z,A-Z,0-9]{22})$/;
    var spotifyID = spotifyRegex.exec(url)[1];
    if ((0, _ramda.test)(/track/, url)) {
      var query = _qs2.default.stringify({
        uris: url
      });
      (0, _axios2.default)('https://api.spotify.com/v1/users/' + process.env.SPOTIFY_USER_NAME + '/playlists/' + process.env.SPOTIFY_PLAYLIST_ID + '/tracks?' + query, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          Accept: 'application/json'
        }
      }).then(function () {
        dispatch(getPlaylistTracks(accessToken));
      }).then(function () {
        (0, _axios2.default)('https://api.spotify.com/v1/tracks/' + spotifyID, {
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json'
          }
        }).then(function (_ref) {
          var data = _ref.data;

          dispatch({
            type: SHOW_NOTIFICATION,
            notification: {
              text: data.name + ' by ' + data.artists[0].name,
              type: 'track'
            }
          });
        });
      }).catch(function (err) {
        dispatch({
          type: ADDED_TO_PLAYLIST
        });
      });
    } else {
      _axios2.default.get('https://api.spotify.com/v1/albums/' + spotifyID + '/tracks', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          Accept: 'application/json'
        }
      }).then(function (_ref2) {
        var data = _ref2.data;

        var tracks = data.items.map(function (item) {
          return item.uri;
        }).join(',');
        var query = _qs2.default.stringify({
          uris: tracks
        });
        (0, _axios2.default)('https://api.spotify.com/v1/users/' + process.env.SPOTIFY_USER_NAME + '/playlists/' + process.env.SPOTIFY_PLAYLIST_ID + '/tracks?' + query, {
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json'
          }
        }).then(function () {
          dispatch({
            type: ADDED_TO_PLAYLIST
          });
          dispatch(getPlaylistTracks(accessToken));
        }).then(function () {
          (0, _axios2.default)('https://api.spotify.com/v1/albums/' + spotifyID, {
            method: 'get',
            headers: {
              Authorization: 'Bearer ' + accessToken,
              Accept: 'application/json'
            }
          }).then(function (_ref3) {
            var data = _ref3.data;

            dispatch({
              type: SHOW_NOTIFICATION,
              notification: {
                text: data.name + ' by ' + data.artists[0].name,
                type: 'album'
              }
            });
          });
        }).catch(function (err) {
          dispatch({ type: ADDED_TO_PLAYLIST });
        });
      });
    }
  };
};

var clearNotification = exports.clearNotification = function clearNotification() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_NOTIFICATION
    });
  };
};

var getCurrentTrack = exports.getCurrentTrack = function getCurrentTrack(accessToken) {
  return function (dispatch) {
    dispatch({
      type: REQUEST_CURRENT_TRACK
    });
    _axios2.default.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(function (_ref4) {
      var data = _ref4.data;
      var item = data.item;

      dispatch({
        type: RECEIVE_CURRENT_TRACK,
        track: {
          album: item.album.name,
          artist: item.artists[0].name,
          duration: item.duration_ms,
          id: item.id,
          image: item.album.images[0].url,
          isPlaying: data.is_playing,
          name: item.name,
          progress: data.progress_ms
        }
      });
    }).catch(function (err) {
      // dispatch({ type: BAD_TOKEN })
    });
  };
};

var getPlaylistTracks = exports.getPlaylistTracks = function getPlaylistTracks(accessToken) {
  return function (dispatch) {
    dispatch({
      type: REQUEST_PLAYLIST
    });
    return _axios2.default.get('https://api.spotify.com/v1/users/' + process.env.SPOTIFY_USER_NAME + '/playlists/' + process.env.SPOTIFY_PLAYLIST_ID, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(function (_ref5) {
      var data = _ref5.data;

      var tracks = data.tracks.items.map(function (item) {
        return {
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          id: item.track.id,
          image: item.track.album.images[0].url,
          name: item.track.name
        };
      });
      dispatch({
        type: RECEIVE_PLAYLIST,
        tracks: tracks
      });
    }).catch(function (err) {
      console.log(err);
    });
  };
};

var getTokens = exports.getTokens = function getTokens() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_TOKENS
    });
    _axios2.default.get(process.env.BACKEND_LOGIN + '/tokens').then(function (response) {
      dispatch({
        type: RECEIVE_TOKENS,
        data: response.data
      });
    }).catch(function () {
      dispatch({
        type: RECEIVE_TOKENS_ERROR
      });
    });
  };
};

var login = exports.login = function login() {
  return {
    type: LOGGED_IN
  };
};

var startPlayback = exports.startPlayback = function startPlayback(accessToken, position) {
  return function (dispatch) {
    dispatch({
      type: START_PLAYBACK
    });

    (0, _axios2.default)({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
      data: {
        context_uri: process.env.SPOTIFY_PLAYLIST_URI,
        offset: {
          position: position
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(function () {
      setTimeout(function () {
        return dispatch(getCurrentTrack(accessToken));
      }, 500);
    }).catch(function (err) {
      console.log(err);
    });
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxThunk = __webpack_require__(11);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = __webpack_require__(12);

var _reactCookie = __webpack_require__(13);

var _reactRedux = __webpack_require__(3);

var _reactRouter = __webpack_require__(4);

var _server = __webpack_require__(14);

var _reactRouterRedux = __webpack_require__(15);

var _universalCookieExpress = __webpack_require__(16);

var _universalCookieExpress2 = _interopRequireDefault(_universalCookieExpress);

var _home = __webpack_require__(5);

var _home2 = _interopRequireDefault(_home);

var _routes = __webpack_require__(31);

var _routes2 = _interopRequireDefault(_routes);

var _songs = __webpack_require__(32);

var _songs2 = _interopRequireDefault(_songs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(33);
var request = __webpack_require__(34);
var bodyParser = __webpack_require__(35);
var querystring = __webpack_require__(36);
var cookieParser = __webpack_require__(37);
var dotenv = __webpack_require__(38);
var path = __webpack_require__(39);

// import App from './src/';


dotenv.config();

var app = express();
app.use((0, _universalCookieExpress2.default)());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public'), { index: false }));
app.use(cookieParser());

var PORT = process.env.PORT || 3000;

var renderPage = function renderPage(appHtml) {
  return '\n  <!doctype html>\n  <html>\n    <head>\n      <title>Playlist</title>\n      <link href="/main.css" type="text/css" rel="stylesheet">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n    </head>\n    <body>\n      <div id="app">' + appHtml + '</div>\n      <script src="/bundle.js"></script>\n    </body>\n  </html>\n  ';
};

app.get('*', function (req, res) {
  var context = {};
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    songs: _songs2.default,
    routing: _reactRouterRedux.routerReducer
  }), (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default)));
  var appHtml = (0, _server.renderToString)(_react2.default.createElement(
    _reactCookie.CookiesProvider,
    { cookies: req.universalCookies },
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouter.StaticRouter,
        { location: req.url, context: context },
        _react2.default.createElement(_home2.default, null)
      )
    )
  ));

  res.status(200).send(renderPage(appHtml));
});

app.listen(PORT, function () {
  console.log('listening on port ' + PORT);
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-cookie");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("universal-cookie-express");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ramda = __webpack_require__(1);

var _user = __webpack_require__(18);

var _user2 = _interopRequireDefault(_user);

var _login = __webpack_require__(28);

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageDisplay = function (_Component) {
  _inherits(PageDisplay, _Component);

  function PageDisplay() {
    _classCallCheck(this, PageDisplay);

    return _possibleConstructorReturn(this, (PageDisplay.__proto__ || Object.getPrototypeOf(PageDisplay)).apply(this, arguments));
  }

  _createClass(PageDisplay, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getTokens();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          accessToken = _props.accessToken,
          refreshToken = _props.refreshToken;


      if ((0, _ramda.isNil)(accessToken) && (0, _ramda.isNil)(refreshToken)) return _react2.default.createElement(_login2.default, this.props);

      return _react2.default.createElement(_user2.default, this.props);
    }
  }]);

  return PageDisplay;
}(_react.Component);

exports.default = PageDisplay;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _loader = __webpack_require__(19);

var _loader2 = _interopRequireDefault(_loader);

var _track = __webpack_require__(20);

var _track2 = _interopRequireDefault(_track);

var _titleDivider = __webpack_require__(21);

var _titleDivider2 = _interopRequireDefault(_titleDivider);

var _trackStatus = __webpack_require__(22);

var _trackStatus2 = _interopRequireDefault(_trackStatus);

var _startButton = __webpack_require__(23);

var _startButton2 = _interopRequireDefault(_startButton);

var _topDecoration = __webpack_require__(24);

var _topDecoration2 = _interopRequireDefault(_topDecoration);

var _inputUri = __webpack_require__(25);

var _inputUri2 = _interopRequireDefault(_inputUri);

var _modal = __webpack_require__(26);

var _modal2 = _interopRequireDefault(_modal);

var _notification = __webpack_require__(27);

var _notification2 = _interopRequireDefault(_notification);

var _first = __webpack_require__(6);

var _first2 = _interopRequireDefault(_first);

var _second = __webpack_require__(7);

var _second2 = _interopRequireDefault(_second);

var _third = __webpack_require__(8);

var _third2 = _interopRequireDefault(_third);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Component) {
  _inherits(User, _Component);

  function User(props) {
    _classCallCheck(this, User);

    var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));

    _this.state = {
      loading: true
    };
    return _this;
  }

  _createClass(User, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var accessToken = this.props.accessToken;

      this.props.getPlaylistTracks(accessToken);
      this.props.getCurrentTrack(accessToken);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var accessToken = this.props.accessToken;

      setTimeout(function () {
        return _this2.setState({
          loading: false
        });
      }, 2000);
      this.infoInterval = setInterval(function () {
        _this2.props.getCurrentTrack(accessToken);
        // this.props.getPlaylistTracks()
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.infoInterval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          accessToken = _props.accessToken,
          _clearNotification = _props.clearNotification,
          currentTrack = _props.currentTrack,
          tracks = _props.tracks,
          startPlayback = _props.startPlayback,
          addToPlaylist = _props.addToPlaylist,
          notification = _props.notification;


      if (this.state.loading) {
        return _react2.default.createElement(_loader2.default, null);
      }

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'top' },
          _react2.default.createElement(
            'div',
            { className: 'content' },
            _react2.default.createElement(_topDecoration2.default, null),
            _react2.default.createElement(_inputUri2.default, { accessToken: accessToken, addToPlaylist: addToPlaylist }),
            _react2.default.createElement(_modal2.default, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'bottom' },
          _react2.default.createElement(
            'div',
            { className: 'content' },
            _react2.default.createElement(_titleDivider2.default, { titleText: 'Currently playing' }),
            currentTrack ? _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'track track--current' },
                _react2.default.createElement(_track2.default, { track: currentTrack })
              ),
              currentTrack.isPlaying ? _react2.default.createElement(_trackStatus2.default, { track: currentTrack }) : _react2.default.createElement(_startButton2.default, { clickHandler: function clickHandler() {
                  return startPlayback(accessToken, currentTrack.position);
                } })
            ) : _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                { className: 'track__name' },
                'No currently playing track'
              ),
              _react2.default.createElement(_startButton2.default, { clickHandler: function clickHandler() {
                  return startPlayback(accessToken, 0);
                } })
            ),
            _react2.default.createElement(_titleDivider2.default, { titleText: 'Up next' }),
            tracks.map(function (track) {
              return _react2.default.createElement(
                'div',
                { className: 'track track--in-list', key: track.id },
                _react2.default.createElement(_track2.default, { track: track })
              );
            })
          )
        ),
        _react2.default.createElement(_notification2.default, _extends({}, notification, { clearNotification: function clearNotification() {
            return _clearNotification();
          } }))
      );
    }
  }]);

  return User;
}(_react.Component);

User.defaultProps = {
  tracks: [],
  searchResults: []
};

exports.default = User;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader() {
  return _react2.default.createElement(
    "div",
    { className: "loader-container" },
    _react2.default.createElement(
      "div",
      { className: "loader" },
      _react2.default.createElement("div", { className: "dot" }),
      _react2.default.createElement("div", { className: "dot" }),
      _react2.default.createElement("div", { className: "dot" })
    )
  );
};

exports.default = Loader;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = function Track(_ref) {
  var track = _ref.track;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('img', { src: track.image, alt: track.album, className: 'track__image' }),
    _react2.default.createElement(
      'div',
      { className: 'track__details' },
      track.name.length > 17 ? _react2.default.createElement(
        'div',
        { className: 'track__marquee' },
        _react2.default.createElement(
          'p',
          { className: 'track__name' },
          track.name
        )
      ) : _react2.default.createElement(
        'p',
        { className: 'track__name' },
        track.name
      ),
      track.artist.length > 30 ? _react2.default.createElement(
        'div',
        { className: 'track__marquee' },
        _react2.default.createElement(
          'p',
          { className: 'track__artist' },
          track.artist
        )
      ) : _react2.default.createElement(
        'p',
        { className: 'track__artist' },
        track.artist
      ),
      track.album.length > 22 ? _react2.default.createElement(
        'div',
        { className: 'track__marquee' },
        _react2.default.createElement(
          'p',
          { className: 'track__album' },
          track.album
        )
      ) : _react2.default.createElement(
        'p',
        { className: 'track__album' },
        track.album
      )
    )
  );
};

exports.default = Track;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TitleDivider = function TitleDivider(_ref) {
  var titleText = _ref.titleText;
  return _react2.default.createElement(
    "div",
    { className: "title" },
    _react2.default.createElement(
      "p",
      { className: "title__text" },
      titleText
    ),
    _react2.default.createElement("div", { className: "title__line" })
  );
};

exports.default = TitleDivider;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeLeft = function timeLeft(track) {
  var millis = track.duration - track.progress;
  var minutes = Math.floor(millis / 60000);
  var seconds = (millis % 60000 / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

var TrackStatus = function TrackStatus(_ref) {
  var track = _ref.track;
  return _react2.default.createElement(
    'div',
    { className: 'track__status' },
    _react2.default.createElement('div', { className: 'track__status__progress-bar' }),
    _react2.default.createElement('div', {
      className: 'track__status__progress-bar track__status__progress-bar--fill',
      style: {
        width: track.progress / track.duration * 75 > 5 ? track.progress / track.duration * 75 + '%' : '2%'
      }
    }),
    _react2.default.createElement(
      'p',
      { className: 'track__status__time' },
      timeLeft(track),
      ' ',
      _react2.default.createElement(
        'span',
        null,
        'left'
      )
    )
  );
};

exports.default = TrackStatus;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartButton = function StartButton(_ref) {
  var clickHandler = _ref.clickHandler;
  return _react2.default.createElement(
    "div",
    { className: "input__button--play" },
    _react2.default.createElement(
      "button",
      {
        className: "input__button",
        onClick: function onClick() {
          return clickHandler();
        }
      },
      " PLAY "
    )
  );
};

exports.default = StartButton;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopDecoration = function TopDecoration() {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement("div", { className: "top__decoration top__decoration--1" }),
    _react2.default.createElement("div", { className: "top__decoration top__decoration--2" }),
    _react2.default.createElement("div", { className: "top__decoration top__decoration--3" })
  );
};

exports.default = TopDecoration;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _ramda = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var invalidURI = function invalidURI(uri) {
  var spotifyRegex = /^spotify:(track|album):([a-z,A-Z,0-9]{22})$/;
  return !(0, _ramda.test)(spotifyRegex, uri);
};

var InputUri = function (_Component) {
  _inherits(InputUri, _Component);

  function InputUri(props) {
    _classCallCheck(this, InputUri);

    var _this = _possibleConstructorReturn(this, (InputUri.__proto__ || Object.getPrototypeOf(InputUri)).call(this, props));

    _this.state = {
      spotifyURI: ''
    };

    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(InputUri, [{
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var value = event.target.value;

      this.setState({
        spotifyURI: value
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var _props = this.props,
          accessToken = _props.accessToken,
          addToPlaylist = _props.addToPlaylist;
      var spotifyURI = this.state.spotifyURI;

      if (!invalidURI(spotifyURI)) {
        addToPlaylist(spotifyURI, accessToken);
        this.setState({
          spotifyURI: ''
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'input' },
        _react2.default.createElement(
          'div',
          { className: 'input__field' },
          _react2.default.createElement('input', {
            type: 'text',
            name: 'spotifyURI',
            className: 'input__spotifyURI',
            value: this.state.spotifyURI,
            placeholder: 'Add spotify track / album uri ...',
            onChange: this.handleInputChange
          }),
          _react2.default.createElement('span', {
            className: (0, _classnames2.default)('jukebox-ok', 'input__tick', {
              'input__tick--show': !invalidURI(this.state.spotifyURI)
            })
          }),
          _react2.default.createElement('span', {
            className: (0, _classnames2.default)('jukebox-cancel', 'input__cancel', {
              'input__cancel--show': invalidURI(this.state.spotifyURI) && !(0, _ramda.isEmpty)(this.state.spotifyURI)
            })
          })
        ),
        _react2.default.createElement('input', {
          type: 'submit',
          value: 'ADD TO PLAYLIST',
          className: (0, _classnames2.default)('input__button', { 'input__button--disabled': invalidURI(this.state.spotifyURI) }),
          onClick: this.handleSubmit
        })
      );
    }
  }]);

  return InputUri;
}(_react.Component);

exports.default = InputUri;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _first = __webpack_require__(6);

var _first2 = _interopRequireDefault(_first);

var _second = __webpack_require__(7);

var _second2 = _interopRequireDefault(_second);

var _third = __webpack_require__(8);

var _third2 = _interopRequireDefault(_third);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

    _this.state = {
      showModal: false
    };

    _this.handleModal = _this.handleModal.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'handleModal',
    value: function handleModal() {
      this.setState({
        showModal: !this.state.showModal
      });

      this.state.showModal ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden';
    }
  }, {
    key: 'render',
    value: function render() {
      var showModal = this.state.showModal;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'info' },
          _react2.default.createElement(
            'button',
            { onClick: this.handleModal, className: 'info__text' },
            'How do I find a Spotify URI?'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('info__modal', { 'info__modal--show': showModal }) },
          _react2.default.createElement(
            'div',
            { className: 'info__modal__content' },
            _react2.default.createElement(
              'div',
              { className: 'info__modal__cross', onClick: this.handleModal },
              _react2.default.createElement(
                'svg',
                { className: 'cross__svg', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 52 52' },
                _react2.default.createElement('circle', { className: 'cross__circle', cx: '26', cy: '26', r: '25', fill: 'none' }),
                _react2.default.createElement('path', { className: 'cross__path cross__path--right', fill: 'none', d: 'M16,16 l20,20' }),
                _react2.default.createElement('path', { className: 'cross__path cross__path--right', fill: 'none', d: 'M16,36 l20,-20' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'info__modal__image' },
              _react2.default.createElement('img', { src: _first2.default, alt: 'Instruction 1' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'info__modal__image' },
              _react2.default.createElement('img', { src: _second2.default, alt: 'Instruction 2' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'info__modal__image' },
              _react2.default.createElement('img', { src: _third2.default, alt: 'Instruction 3' })
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(_react.Component);

exports.default = Modal;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ramda = __webpack_require__(1);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification() {
    _classCallCheck(this, Notification);

    return _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).apply(this, arguments));
  }

  _createClass(Notification, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var _this2 = this;

      if (!(0, _ramda.isEmpty)(this.props.text) && !(0, _ramda.isEmpty)(this.props.type)) {
        setTimeout(function () {
          _this2.props.clearNotification();
        }, 3000);
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return !(0, _ramda.isEmpty)(this.props.text) && !(0, _ramda.isEmpty)(this.props.type) ? _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('notification', {
            'notification--show': !(0, _ramda.isEmpty)(this.props.text) && !(0, _ramda.isEmpty)(this.props.type)
          })
        },
        _react2.default.createElement(
          'p',
          { className: 'notification__text' },
          _react2.default.createElement('span', { className: 'jukebox-ok' }),
          this.props.type + ' ',
          _react2.default.createElement(
            'strong',
            null,
            '"' + this.props.text + '"'
          )
        )
      ) : null;
    }
  }]);

  return Notification;
}(_react.Component);

exports.default = Notification;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function Login(props) {
  return _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(
      'div',
      { className: 'top top--login' },
      _react2.default.createElement(
        'div',
        { className: 'content content--login' },
        _react2.default.createElement(
          'div',
          { className: 'input input--login' },
          _react2.default.createElement(
            'a',
            { className: 'input__button input__button--login', href: process.env.BACKEND_LOGIN + '/login', onClick: function onClick() {
                return props.login();
              } },
            'LOGIN'
          )
        )
      )
    )
  );
};

exports.default = Login;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(4);

var _home = __webpack_require__(5);

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default });

exports.default = routes;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduce;

var _songs = __webpack_require__(9);

var initialState = {
  accessToken: null,
  currentTrack: false,
  logged_in: false,
  refreshToken: null,
  searchResults: [],
  tracks: [],
  notification: {
    text: '',
    type: ''
  }
};

function reduce() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {

    case _songs.ADDED_TO_PLAYLIST:
      {
        return _extends({}, state, {
          searchResults: []
        });
      }

    case _songs.BAD_TOKEN:
      {
        return _extends({}, state, {
          accessToken: null,
          refreshToken: null
        });
      }

    case _songs.CLEAR_NOTIFICATION:
      {
        return _extends({}, state, {
          notification: {
            text: '',
            type: ''
          }
        });
      }

    case _songs.LOGGED_IN:
      {
        return _extends({}, state, {
          logged_in: true
        });
      }

    case _songs.REQUEST_CURRENT_TRACK:
      {
        return state;
      }

    case _songs.REQUEST_PLAYLIST:
      {
        return state;
      }

    case _songs.REQUEST_TOKENS:
      {
        return state;
      }

    case _songs.RECEIVE_CURRENT_TRACK:
      {
        return _extends({}, state, {
          currentTrack: action.track
        });
      }

    case _songs.RECEIVE_PLAYLIST:
      {
        var tracks = action.tracks;

        return _extends({}, state, {
          tracks: tracks
        });
      }

    case _songs.RECEIVE_TOKENS:
      {
        var _action$data = action.data,
            accessToken = _action$data.accessToken,
            refreshToken = _action$data.refreshToken;

        return _extends({}, state, {
          accessToken: accessToken,
          loading: false,
          refreshToken: refreshToken
        });
      }

    case _songs.RECEIVE_TOKENS_ERROR:
      {
        return state;
      }

    case _songs.SHOW_NOTIFICATION:
      {
        return _extends({}, state, {
          notification: action.notification
        });
      }

    case _songs.START_PLAYBACK:
      {
        return state;
      }

    default:
      return state;
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);