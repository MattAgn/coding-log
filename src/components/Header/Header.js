import React from 'react';
import PropTypes from 'prop-types';
import MySettings from './MySettings';
import TimerButton from './TimerButton';

const styles = {
  appTitle: {
    width: 'fit-content',
    margin: 'auto',
    display: 'inline-block',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  icon: {
    width: 30,
    height: 30,
  },
  button: {
    height: '70',
    width: '70',
    padding: '16',
    marginLeft: '10',
  },
  buttonsContainer: {
    position: 'absolute',
    right: '4%',
    width: '7%',
    display: 'flex',
    justifyContent: 'space-between',
  },
};


const Header = ({
  handleChangeDate,
  handleChangeGoal,
  handleClickTimer,
  handleSave,
  isOnTimerMode,
  startingDate,
  goal,
}) => (
  <div style={styles.header}>
    <h1 style={styles.appTitle}>My coding log</h1>
    <div style={styles.buttonsContainer}>
      <TimerButton
        handleClickTimer={handleClickTimer}
        isOnTimerMode={isOnTimerMode}
        iconStyle={styles.icon}
        buttonStyle={styles.button}
      />
      <MySettings
        startingDate={startingDate}
        goal={goal}
        handleSave={handleSave}
        handleChangeGoal={handleChangeGoal}
        handleChangeDate={handleChangeDate}
        iconStyle={styles.icon}
        buttonStyle={styles.button}
      />
    </div>
  </div>
);

Header.propTypes = {
  handleChangeDate: PropTypes.func.isRequired,
  handleChangeGoal: PropTypes.func.isRequired,
  handleClickTimer: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isOnTimerMode: PropTypes.bool.isRequired,
  startingDate: PropTypes.instanceOf(Date).isRequired,
  goal: PropTypes.number.isRequired,
};

export default Header;
