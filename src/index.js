import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import AnimatedNumber from 'react-animated-number';
import './index.css';

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px',
    fontWeight: '500',
  },
  datePicker: {
    width: 'fit-content',
  },
  title: {
    fontWeight: '300',
  },
  counter: {
    fontWeight: '300',
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '100px',
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity'
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
    count = Math.ceil((currentDate.getTime() - date.getTime()) / div) + 1;
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
          <h1 style={styles.title}>My coding log</h1>
          <div>
            <div>
              <span style={{display: 'inline-block', marginRight: 20}}>
                Starting date :
              </span>
              <DatePicker
                style={{display: 'inline-block'}}
                id='start_date_picker'
                defaultDate={this.state.startingDate}
                onChange={this.handleChangeDate}
              />
            </div>
            <AnimatedNumber
              component="h1"
              value={this.state.daysCounter}
              style={styles.counter}
              frameStyle={perc => (
                perc === 100 ? {} : {backgroundColor: 'white'}
              )}
              duration={700}
              stepPrecision={0}
            />
            <h3 style={styles.title}>days of coding everyday !</h3>
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
