import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Calendar from 'material-ui/svg-icons/action/event';

const TimerButton = ({
  handleClickTimer, isOnClockMode, buttonStyle, iconStyle,
}) => (
  <React.Fragment>
    <IconButton
      onKeyUp={loseFocus}
      style={{ ...buttonStyle }}
      iconStyle={iconStyle}
      onClick={handleClickTimer}
    >
      {!isOnClockMode ?
        <Alarm color="#E0E0E0" />
      : <Calendar color="#E0E0E0" />}
    </IconButton>
  </React.Fragment>
);

function loseFocus(event, isFocused) {
  event.preventDefault();
  return false;
}


TimerButton.propTypes = {
  isOnClockMode: PropTypes.bool.isRequired,
  handleClickTimer: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object.isRequired,
  iconStyle: PropTypes.object.isRequired,
};

export default TimerButton;
