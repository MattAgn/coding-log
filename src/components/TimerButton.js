import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Calendar from 'material-ui/svg-icons/action/event';

const styles = {
  button: {
    height: '70',
    width: '70',
    padding: '16',
    // display: 'inline-block',
  },
  largeIcon: {
    width: 30,
    height: 30,
  },
};

const TimerButton = ({ handleClickTimer, isOnTimerMode }) => (
  <div>
    <IconButton
      style={styles.button}
      iconStyle={styles.largeIcon}
      onClick={handleClickTimer}
    >
      {!isOnTimerMode ?
        <Alarm color="#E0E0E0" />
      : <Calendar color="#E0E0E0" />}
    </IconButton>
  </div>
);

TimerButton.propTypes = {
  isOnTimerMode: PropTypes.bool.isRequired,
  handleClickTimer: PropTypes.func.isRequired,
};

export default TimerButton;
