import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Calendar from 'material-ui/svg-icons/action/event';

const TimerButton = ({
  handleClickTimer, isOnTimerMode, buttonStyle, iconStyle,
}) => (
  <React.Fragment>
    <IconButton
      style={{ ...buttonStyle }}
      iconStyle={iconStyle}
      onClick={handleClickTimer}
    >
      {!isOnTimerMode ?
        <Alarm color="#E0E0E0" />
      : <Calendar color="#E0E0E0" />}
    </IconButton>
  </React.Fragment>
);

TimerButton.propTypes = {
  isOnTimerMode: PropTypes.bool.isRequired,
  handleClickTimer: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object.isRequired,
  iconStyle: PropTypes.object.isRequired,
};

export default TimerButton;
