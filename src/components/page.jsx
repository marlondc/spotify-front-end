import React, { Component } from 'react';
import { isNil } from 'ramda';
import io from 'socket.io-client';

import User from './user';
import Login from './login';

class PageDisplay extends Component {
  componentWillMount() {
    this.props.getTokens();
  }

  render() {
    const {
      accessToken,
      refreshToken,
    } = this.props
    
    if (isNil(accessToken) && isNil(refreshToken)) return <Login {...this.props} />

    return <User {...this.props} />
  }
}

export default PageDisplay;
