import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import LinearProgress from 'material-ui/LinearProgress';
import AnimatedNumber from 'react-animated-number';
import './index.css';
import ProgressBar from './components/ProgressBar'

const defaultStyle = {
  color: 'white',
  fontFamily: '"lato", sans-serif',
  fontWeight: 300,
}

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px',
    fontWeight: '500',
    color: 'white',
  },
  datePicker: {
    width: 'fit-content',
  },
  counter: {
    ...defaultStyle,
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '100px',
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity',
  },
  dateText: {
    width: 'fit-content',
    color: 'white'
  }
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
          <h1 style={defaultStyle}>My coding log</h1>
          <div>
            <div>
              <h4 style={{margin: '5vh 0px 0px 0px', ...defaultStyle}}>
                Starting date
              </h4>
              <DatePicker
                style={{display: 'inline-block'}}
                textFieldStyle={styles.dateText}
                id='start_date_picker'
                defaultDate={this.state.startingDate}
                onChange={this.handleChangeDate}
              />
            </div>
            <AnimatedNumber
              component="h1"
              value={this.state.daysCounter}
              style={styles.counter}
              duration={700}
              stepPrecision={0}
            />
            <h3 style={defaultStyle}>days of coding everyday so far !</h3>
            <ProgressBar counter={this.state.daysCounter} />
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
