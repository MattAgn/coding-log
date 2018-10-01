import React from 'react';
import Radium from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style.css';

import Header from './components/header/Header';
import GlobalView from './components/globalView/GlobalView';
import TimerView from './components/timerView/TimerView';

class App extends React.Component {
  constructor() {
    super();
    const savedGoal = localStorage.getItem('goal');
    const savedTimePerDay = localStorage.getItem('timePerDay');
    const savedCompletedDays = localStorage.getItem('completedDays');
    let goal;
    let timePerDay;
    let completedDays;
    goal = savedGoal ? parseInt(savedGoal, 10) : 100;
    timePerDay = savedTimePerDay > 0 ? parseInt(savedTimePerDay, 10) : 360;
    completedDays = savedCompletedDays ? parseInt(savedCompletedDays, 10) : 0;
    this.state = {
      goal: goal,
      timePerDay: timePerDay,
      completedDays: completedDays,
      isOnClockMode: false,
      isClockPaused: true,
      currentTime: 0,
      clock: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Component should not update if only the timer has changed
    if (!nextState.isOnClockMode && !this.state.isOnClockMode) {
      if (
        (nextState.inputGoal === this.state.goal ||
          nextState.timePerDay === this.state.timePerDay ||
          nextState.startingDate === this.state.startingDate) &&
        nextState.completedDays === this.state.completedDays
      ) {
        return false;
      }
    }
    return true;
  }

  handleClickAddDay = () => {
    this.setState(
      prevState => ({ completedDays: prevState.completedDays + 1 }),
      () => {
        localStorage.setItem('completedDays', this.state.completedDays);
      }
    );
  };

  handleClickSave = ({ inputTimePerDay, inputGoal }) => {
    // TODO: issue here, setState called but not updating
    // That's why we have to force the update,
    this.setState(
      {
        goal: inputGoal,
        timePerDay: inputTimePerDay
      },
      () => {
        localStorage.setItem('timePerDay', this.state.timePerDay);
        localStorage.setItem('goal', this.state.goal);
        this.forceUpdate();
      }
    );
  };

  handleClickTimer = () => {
    this.setState(prevState => ({
      isOnClockMode: !prevState.isOnClockMode
    }));
  };

  handleClickPlay = () => {
    this.pauseClock();
  };

  handleClickReset = () => {
    this.setState(() => ({
      currentTime: 0
    }));
    this.pauseClock(true);
  };

  pauseClock = (isPauseForced = false) => {
    let clock = this.state.clock;
    if ((!this.state.isClockPaused || isPauseForced) && clock) {
      clearInterval(clock);
      clock = null;
    } else if (isPauseForced) {
      clock = null;
    } else {
      clock = setInterval(this.runClock, 1000);
    }
    this.setState(prevState => ({
      isClockPaused: isPauseForced ? true : !prevState.isClockPaused,
      clock: clock
    }));
  };

  runClock = () => {
    this.setState(prevState => ({
      currentTime: prevState.currentTime + 1
    }));
    if (this.state.currentTime === this.state.timePerDay) {
      this.setState(
        prevState => ({ completedDays: prevState.completedDays + 1 }),
        () => {
          localStorage.setItem('completedDays', this.state.completedDays);
        }
      );
      alert("Congrats ! You've completed yet another session !");
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container} id="container">
          <Header
            isOnClockMode={this.state.isOnClockMode}
            goal={this.state.goal}
            timePerDay={this.state.timePerDay}
            handleClickTimer={this.handleClickTimer}
            handleClickSave={this.handleClickSave}
            handleClickAddDay={this.handleClickAddDay}
          />
          <div className="flip-container" key="container">
            <div
              className={`flipper ${!this.state.isOnClockMode && 'flipping'}`}
            >
              <TimerView
                isOnClockMode
                onClickPlay={this.handleClickPlay}
                onClickReset={this.handleClickReset}
                isClockPaused={this.state.isClockPaused}
                timePerDay={this.state.timePerDay}
                currentTime={this.state.currentTime}
              />
              <GlobalView
                isOnClockMode
                goal={this.state.goal}
                daysCount={this.state.completedDays}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  container: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white',
    margin: '1%',
    width: '98%',
    height: '94vh', // issue 100vh taking more than whole screen
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  appTitle: {
    width: 'fit-content',
    margin: 'auto',
    display: 'inline-block'
  },
  buttonsContainer: {
    display: 'flex'
  }
};

export default Radium(App);
