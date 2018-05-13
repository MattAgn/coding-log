import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnimatedNumber from 'react-animated-number';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
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
  counter: {
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '10%',
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity',
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
    let goal;
    let startingDate;
    startingDate = savedStartingDate ? new Date(savedStartingDate) : new Date();
    goal = savedGoal ? savedGoal : 100;
    this.state = { 
      startingDate: startingDate,
      chosenStartingDate: startingDate,
      goal: goal,
      chosenGoal: goal,
      isOnTimerMode: false,
    };
  };

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
      isOnTimerMode: !prevState.isOnTimerMode,
    }))
  }

  render() {
    const daysCount = this.countDays(this.state.startingDate);
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <Header 
          handleClickTimer={this.handleClickTimer} 
          isOnTimerMode={this.state.isOnTimerMode}
          startingDate={this.state.startingDate}
          goal={this.state.goal}
          handleSave={this.handleSave}
          handleChangeGoal={this.handleChangeGoal}
          handleChangeDate={this.handleChangeDate}/>
          <div>
            <AnimatedNumber
              component="h1"
              value={daysCount}
              style={styles.counter}
              duration={700}
              stepPrecision={0}
            />
            <h3>days of coding everyday so far !</h3>
            <ProgressBar counter={Math.floor(daysCount/this.state.goal*100)} />
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
