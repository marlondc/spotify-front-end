import React, { Component } from 'react';
import { isEmpty } from 'ramda';
import classnames from 'classnames';


class Notification extends Component {
  componentWillReceiveProps() {
    if (!isEmpty(this.props.text) && !isEmpty(this.props.type)) {
      setTimeout(() => {
        this.props.clearNotification()
      }, 3000);
    }
  }

  render() {
    
    return (
      !isEmpty(this.props.text) && !isEmpty(this.props.type)
        ? 
          <div
            className={classnames('notification', {
              'notification--show': !isEmpty(this.props.text) && !isEmpty(this.props.type),
            })}
          >
            <p className="notification__text"><span className="jukebox-ok" />{`${this.props.type} `}<strong>{`"${this.props.text}"`}</strong></p>
          </div>
        : null
    )
  }
}

export default Notification;
