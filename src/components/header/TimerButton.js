import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import HomeIcon from 'material-ui/svg-icons/action/home';

function loseFocus(event) {
  event.preventDefault();
  return false;
}

const TimerButton = ({
  handleClickTimer,
  isOnClockMode,
  buttonStyle,
  iconStyle
}) => (
  <React.Fragment>
    <IconButton
      id="timer_button"
      onKeyUp={loseFocus}
      style={{ ...buttonStyle }}
      iconStyle={iconStyle}
      onClick={handleClickTimer}
      tooltip={!isOnClockMode ? 'Start now!' : 'See progress'}
    >
      {!isOnClockMode ? (
        <AlarmIcon color="#E0E0E0" />
      ) : (
        <HomeIcon color="#E0E0E0" />
      )}
    </IconButton>
  </React.Fragment>
);

TimerButton.propTypes = {
  isOnClockMode: PropTypes.bool.isRequired,
  handleClickTimer: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object.isRequired,
  iconStyle: PropTypes.object.isRequired
};

export default TimerButton;
