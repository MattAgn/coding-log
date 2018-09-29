import React from 'react';
import PropTypes from 'prop-types';
import PlusIcon from 'material-ui/svg-icons/content/add';

import MyIconButton from '../common/MyIconButton';
import MySettings from './MySettings';
import TimerButton from './TimerButton';

const Header = ({
  handleClickTimer,
  handleClickPlus,
  isOnClockMode,
  ...settingsProps
}) => (
  <div style={styles.header}>
    <h1 style={styles.appTitle}>My coding log</h1>
    <div style={styles.buttonsContainer}>
      <TimerButton
        handleClickTimer={handleClickTimer}
        isOnClockMode={isOnClockMode}
      />
      <MyIconButton
        handleClick={handleClickPlus}
        tooltip="Add a completed day manually"
      >
        <PlusIcon color="#E0E0E0" />
      </MyIconButton>
      <MySettings {...settingsProps} />
    </div>
  </div>
);

Header.propTypes = {
  handleClickTimer: PropTypes.func.isRequired,
  handleClickPlus: PropTypes.func.isRequired,
  isOnClockMode: PropTypes.bool.isRequired
};

const styles = {
  appTitle: {
    marginLeft: '2%',
    width: 'fit-content',
    display: 'inline-block'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default Header;
