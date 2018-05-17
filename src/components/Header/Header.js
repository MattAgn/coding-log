import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton/IconButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
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
    paddingTop: '3%',
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
  handleChangeTimePerDay,
  handleSave,
  handleClickPlus,
  isOnClockMode,
  startingDate,
  goal,
}) => (
  <div style={styles.header}>
    <h1 style={styles.appTitle}>My coding log</h1>
    <div style={styles.buttonsContainer}>
      <TimerButton
        handleClickTimer={handleClickTimer}
        isOnClockMode={isOnClockMode}
        iconStyle={styles.icon}
        buttonStyle={styles.button}
      />
      <IconButton
        onClick={handleClickPlus}
        iconStyle={styles.icon}
        style={styles.button}
        tooltip="Add a completed day manually"
      >
        <PlusIcon color="#E0E0E0" />
      </IconButton>
      <MySettings
        startingDate={startingDate}
        goal={goal}
        handleSave={handleSave}
        handleChangeGoal={handleChangeGoal}
        handleChangeDate={handleChangeDate}
        handleChangeTimePerDay={handleChangeTimePerDay}
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
  handleChangeTimePerDay: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClickPlus: PropTypes.func.isRequired,
  isOnClockMode: PropTypes.bool.isRequired,
  startingDate: PropTypes.instanceOf(Date).isRequired,
  goal: PropTypes.number.isRequired,
};

export default Header;

