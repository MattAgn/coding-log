import React from 'react';
import PropTypes from 'prop-types';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import HomeIcon from 'material-ui/svg-icons/action/home';

import MyIconButton from '../common/MyIconButton';

function loseFocus(event) {
  event.preventDefault();
  return false;
}

const TimerButton = ({ handleClickTimer, isOnClockMode, iconStyle }) => (
  <React.Fragment>
    <MyIconButton
      id="timer_button"
      onKeyUp={loseFocus}
      handleClick={handleClickTimer}
      tooltip={!isOnClockMode ? 'Start now!' : 'See progress'}
    >
      {!isOnClockMode ? (
        <AlarmIcon color="#E0E0E0" />
      ) : (
        <HomeIcon color="#E0E0E0" />
      )}
    </MyIconButton>
  </React.Fragment>
);

TimerButton.propTypes = {
  isOnClockMode: PropTypes.bool.isRequired,
  handleClickTimer: PropTypes.func.isRequired
};

export default TimerButton;
