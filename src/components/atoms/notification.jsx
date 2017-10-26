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
      <div
        className={classnames('notification', {
          'notification--show': !isEmpty(this.props.text) && !isEmpty(this.props.type),
        })}
      >
        <p className="notification__text"><span className="jukebox-ok" />You just added <strong>{`"${this.props.type} ${this.props.text}"`}</strong></p>
      </div>    
    )
  }
}

export default Notification;
