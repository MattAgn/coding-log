import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header/Header';
import GlobalView from './components/GlobalView/GlobalView';
import TimerView from './components/TimerView/TimerView';
import './index.css';

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px',
    fontWeight: '500',
    color: 'white',
  },
  appTitle: {
    width: 'fit-content',
    margin: 'auto',
    display: 'inline-block',
  },
  buttonsContainer: {
    display: 'flex',
    position: 'absolute',
    right: '5%',
  }
}


class App extends React.Component {
  constructor() {
    super();
    const savedStartingDate = localStorage.getItem('startingDate');
    const savedGoal = localStorage.getItem('goal');
    const savedTimePerDay = localStorage.getItem('timePerDay');
    let goal;
    let startingDate;
    let timePerDay;
    startingDate = savedStartingDate ? new Date(savedStartingDate) : new Date();
    goal = savedGoal ? parseInt(savedGoal, 10) : 100;
    timePerDay = savedTimePerDay ? parseInt(savedTimePerDay) : 3600;
    this.state = { 
      startingDate: startingDate,
      chosenStartingDate: startingDate,
      goal: goal,
      chosenGoal: goal,
      timePerDay: timePerDay,
      chosenTimePerDay: timePerDay,
      isOnClockMode: false,
      isClockPaused: true,
      currentTime: 0,
      clock: null,
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.isOnClockMode && !this.state.isOnClockMode) {
      if (nextState.goal === this.state.goal ||
          nextState.timePerDay === this.state.timePerDay ||
          nextState.startingDate === this.state.startingDate ) {
        
        return false;
      }
    }
    return true;
  }

  countDays(date) {
    let count;
    const currentDate = new Date();
    const div = 1000 * 60 * 60 * 24;
    count = Math.ceil((currentDate.getTime() - date.getTime()) / div) - 1;
    return count;
  }

  handleChangeDate = (event, date) => {
    this.setState(() => ({
      chosenStartingDate: date,
    }));
    localStorage.setItem('startingDate', date);
  }

  handleChangeGoal = (event, value) => {
    this.setState(() => ({
      chosenGoal: value,
    }));
    localStorage.setItem('goal', value);
  }

  handleSave = () => {
    this.setState(prevState => ({
      startingDate: prevState.chosenStartingDate,
      goal: prevState.chosenGoal,
    }));
  }

  handleClickTimer = () => {
    this.setState(prevState => ({
      isOnClockMode: !prevState.isOnClockMode,
    }), function () {
        if (this.state.isOnClockMode) {
          window.addEventListener('keypress', this.handlePauseClock);
        } else {
          window.removeEventListener('keypress', this.handlePauseClock);
        }
      }
    );
  }

  handlePauseClock = (event) => {
    if (event.keyCode === 32 || event.wich === 32) {
      let clock = this.state.clock;
      if (!this.state.isClockPaused && clock) {
        clearInterval(clock);
        clock = null;
      } else {
        clock = setInterval(this.runClock, 1000);
      }
      this.setState(prevState => ({
        isClockPaused: !prevState.isClockPaused,
        clock: clock, 
      }));
    }
  }

  runClock = () => {
    this.setState(prevState => ({
      currentTime: prevState.currentTime + 1
    }))   
  }

  render() {
    const daysCount = this.countDays(this.state.startingDate);
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <Header 
          handleClickTimer={this.handleClickTimer} 
          isOnClockMode={this.state.isOnClockMode}
          startingDate={this.state.startingDate}
          goal={this.state.goal}
          handleSave={this.handleSave}
          handleChangeGoal={this.handleChangeGoal}
          handleChangeDate={this.handleChangeDate}/>
          {this.state.isOnClockMode ? 
            <TimerView 
              timePerDay={this.state.timePerDay} 
              currentTime={this.state.currentTime}/>
          : <GlobalView 
              goal={this.state.goal} 
              daysCount={daysCount}/>
          }
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
