import React, { Component } from 'react';
import { isNil } from 'ramda';

import User from './user';
import Login from './login';
import Loader from './atoms/loader';

class PageDisplay extends Component {
  componentWillMount() {
    this.props.getTokens();
  }

  render() {
    const {
      accessToken,
      refreshToken,
      loading,
    } = this.props
    
    if (loading) return <Loader />

    if (isNil(accessToken) && isNil(refreshToken) && !loading) return <Login {...this.props} />

    return <User {...this.props} />
  }
}

export default PageDisplay;
