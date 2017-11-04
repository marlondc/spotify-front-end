const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { match, StaticRouter, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { routerReducer } from 'react-router-redux';
import cookiesMiddleware from 'universal-cookie-express';

// import App from './src/';
import Home from './src/containers/home';
import AppRouter from './src/routes';
import songs from './src/reducers/songs';

dotenv.config();

const app = express();
app.use(cookiesMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public'), { index: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const renderPage = appHtml => (
  `
  <!doctype html>
  <html>
    <head>
      <title>Playlist</title>
      <link href="/main.css" type="text/css" rel="stylesheet">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div id="app">${appHtml}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `
);

app.get('*', (req, res) => {
  const context = {};
  const store = createStore(
    combineReducers({
      songs,
      routing: routerReducer,
    }),
    compose(
      applyMiddleware(
        thunkMiddleware,
      ),
    ),
  )
  const appHtml = renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Home />
        </StaticRouter>
      </Provider>
    </CookiesProvider>,
  );

  res.status(200).send(renderPage(appHtml))
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});