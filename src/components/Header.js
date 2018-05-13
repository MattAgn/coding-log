import React from 'react';
import MySettings from './MySettings';
import TimerButton from './TimerButton';

const styles = {
  appTitle: {
    width: 'fit-content',
    margin: 'auto',
    display: 'inline-block',
  },
  buttonsContainer: {
    display: 'flex',
    position: 'absolute',
    right: '5%',
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
      />
      <MySettings
        startingDate={startingDate}
        goal={goal}
        handleSave={handleSave}
        handleChangeGoal={handleChangeGoal}
        handleChangeDate={handleChangeDate}
      />
    </div>
  </div>
);

export default Header;

