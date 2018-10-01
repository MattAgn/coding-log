import React from 'react';
import PropTypes from 'prop-types';
import PlusIcon from 'material-ui/svg-icons/content/add';

import MyIconButton from '../common/MyIconButton';
import MySettings from './MySettings';
import TimerButton from './TimerButton';

const Header = ({
  handleClickTimer,
  handleClickAddDay,
  isOnClockMode,
  ...settingsProps
}) => (
  <div style={styles.header}>
    <h1 style={styles.appTitle}>100DaysOfCode challenge</h1>
    <div style={styles.buttonsContainer}>
      <TimerButton
        handleClickTimer={handleClickTimer}
        isOnClockMode={isOnClockMode}
      />
      <MyIconButton
        handleClick={handleClickAddDay}
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
  handleClickAddDay: PropTypes.func.isRequired,
  isOnClockMode: PropTypes.bool.isRequired
};

const styles = {
  appTitle: {
    fontSize: '5vmin',
    margin: '1% auto',
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
