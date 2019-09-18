import React from 'react';
import './notification.scss';

const Notification = ({ notification }) => {

  return (
    <div className={ 'notification ' + (notification.length ? 'notification-bar' : '') }>
      { notification.toUpperCase() }
    </div>
  );
}

export default Notification;
