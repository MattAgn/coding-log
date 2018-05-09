import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnimatedNumber from 'react-animated-number';
import ProgressBar from './components/ProgressBar';
import SettingsComponent from './components/SettingsComponent'
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
}


class App extends React.Component {
  constructor() {
    super();
    const savedStartingDate = localStorage.getItem('startingDate');
    if (savedStartingDate) {
      this.state = { startingDate: new Date(savedStartingDate)};
    } else {
      this.state = { startingDate: new Date()};
    }
  };

  componentWillMount() {
    this.setState(prevState => ({ daysCounter: this.countDays(prevState.startingDate)}));
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
      startingDate: date,
      daysCounter: this.countDays(date),
    }));
    localStorage.setItem('startingDate', date);
  }


  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.appTitle}>My coding log</h1>
            <SettingsComponent 
              startingDate={this.state.startingDate}
              handleChangeDate={this.handleChangeDate}/>
          </div>
          <div>
            <AnimatedNumber
              component="h1"
              value={this.state.daysCounter}
              style={styles.counter}
              duration={700}
              stepPrecision={0}
            />
            <h3>days of coding everyday so far !</h3>
            <ProgressBar counter={this.state.daysCounter} />
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
