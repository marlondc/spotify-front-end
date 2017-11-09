import React, { Component } from 'react';
import { isEmpty } from 'ramda';
import classnames from 'classnames';

const Notification = ({ text, type }) => (
  !isEmpty(text) && !isEmpty(type)
    ? 
      <div
        className={classnames('notification', {
          'notification--show': !isEmpty(text) && !isEmpty(type),
          'notification--red': type !== 'added track',
        })}
      >
        <p className="notification__text">
          <span className={classnames({
            'jukebox-ok': type === 'added track',
            'jukebox-cancel': type !== 'added track',
          })} />
          {`${type} `}
          <strong>{`"${text}"`}</strong>
        </p>
      </div>
    : null
);

export default Notification;
