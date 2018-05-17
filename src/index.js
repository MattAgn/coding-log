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
    fontWeight: '500',
    color: 'white',
    width: '100%',
    height: '100%',
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
    const savedCompletedDays = localStorage.getItem('completedDays');
    let goal;
    let startingDate;
    let timePerDay;
    let completedDays;
    startingDate = savedStartingDate ? new Date(savedStartingDate) : new Date();
    goal = savedGoal ? parseInt(savedGoal, 10) : 100;
    timePerDay = savedTimePerDay > 0 ? parseInt(savedTimePerDay, 10) : 360;
    completedDays = savedCompletedDays ? parseInt(savedCompletedDays, 10) : 0;
    this.state = { 
      startingDate: startingDate,
      chosenStartingDate: startingDate,
      goal: goal,
      chosenGoal: goal,
      timePerDay: timePerDay,
      chosenTimePerDay: timePerDay,
      completedDays: completedDays,
      isOnClockMode: false,
      isClockPaused: true,
      currentTime: 0,
      clock: null,
      flipping: "flipping",
    };
  };

  componentDidUpdate() {
    console.log('update');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.isOnClockMode && !this.state.isOnClockMode) {
      if ((nextState.goal === this.state.goal ||
          nextState.timePerDay === this.state.timePerDay ||
          nextState.startingDate === this.state.startingDate )
        && nextState.completedDays === this.state.completedDays) {
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

  handleClickPlus = () => {
    this.setState(prevState => ({completedDays: prevState.completedDays + 1}),
    () => {localStorage.setItem('completedDays', this.state.completedDays)});
  }

  handleChangeDate = (event, date) => {
    this.setState(() => ({
      chosenStartingDate: date,
    }));
    localStorage.setItem('startingDate', date);
  }

  handleChangeGoal = (event, value) => {
    this.setState(() => ({
      chosenGoal: parseInt(value, 10),
    }));
    localStorage.setItem('goal', parseInt(value,10));
  }

  handleChangeTimePerDay = (event, value) => {
    const chosenTime = value.split(":").reverse().reduce((res,cur,index) => {
      res += (cur * Math.pow(60, (index+1)));
      return res; 
    }, 0)
    if (parseInt(value, 10) < 0) {
      alert('Aren\'t you lazy ? Please enter a time greater than 0');
    } else {
      this.setState(() => ({
        chosenTimePerDay: chosenTime,
      }));
      localStorage.setItem('timePerDay', chosenTime);
    }
  }

  handleSave = () => {
    this.setState(prevState => ({
      startingDate: prevState.chosenStartingDate,
      goal: prevState.chosenGoal,
      timePerDay: prevState.chosenTimePerDay,
    }));
  }

  handleClickTimer = () => {
    this.setState(prevState => ({
      isOnClockMode: !prevState.isOnClockMode,
      flipping: "flipping",
    }), function () {
        if (this.state.isOnClockMode) {
          window.addEventListener('keypress', this.handlePauseClock);
        } else {
          window.removeEventListener('keypress', this.handlePauseClock);
        }
        this.setState({flipping: ''})
      }
    );
  }

  handlePlay = () => { this.pauseClock(); };  

  handleReset = () => {
    this.setState(() => ({
      currentTime: 0,
    }));
    this.pauseClock(true);
  }

  handlePauseClock = (event) => {
    //TODO: change name
    if (event.keyCode === 32 || event.wich === 32) {
      this.pauseClock();
    }
  }

  pauseClock = ( isPauseForced = false ) => {
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
      clock: clock, 
    }));
  }
  
  runClock = () => {
    this.setState(prevState => ({
      currentTime: prevState.currentTime + 1
    }));
    if (this.state.currentTime === this.state.timePerDay) {
      this.setState(prevState => ({completedDays: prevState.completedDays + 1}),
        () => {localStorage.setItem('completedDays', this.state.completedDays)});
      alert('Congrats ! You\'ve completed yet another session !');   
    }
  }

  render() {
    //const daysCount = this.countDays(this.state.startingDate);
    return (
      <MuiThemeProvider>
        <div style={styles.container} id="container">
          <Header 
          handleClickTimer={this.handleClickTimer} 
          isOnClockMode={this.state.isOnClockMode}
          startingDate={this.state.startingDate}
          goal={this.state.goal}
          timePerDay={this.timePerDay}
          handleSave={this.handleSave}
          handleChangeTimePerDay={this.handleChangeTimePerDay}
          handleChangeGoal={this.handleChangeGoal}
          handleClickPlus={this.handleClickPlus}
          handleChangeDate={this.handleChangeDate}/>
          <div className="flip-container">
            <div className={`flipper ${this.state.flipping}`}> 
              <TimerView 
                isOnClockMode
                onClickPlay={this.handlePlay}
                onClickReset={this.handleReset}
                isClockPaused={this.state.isClockPaused}
                timePerDay={this.state.timePerDay} 
                currentTime={this.state.currentTime}/>
              <GlobalView
                isOnClockMode 
                goal={this.state.goal} 
                daysCount={this.state.completedDays}/>
            </div>
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
