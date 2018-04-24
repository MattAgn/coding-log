import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import './index.css';

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px',
    fontWeight: '500',
  },
  datePicker: {
    width: 'fit-content',
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
    this.setState({ daysCounter: this.countDays()});
  }

  countDays() {
    let count;
    const currentDate = new Date();
    const div = 1000 * 60 * 60 * 24;
    count = Math.ceil((currentDate.getTime() - this.state.startingDate.getTime()) / div) + 1;
    return count;
  }

  handleChangeDate = (event, date) => {
    this.setState(() => ({
      startingDate: date,
      daysCounter: this.countDays(),
    }));
    localStorage.setItem('startingDate', date);
  }


  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          <h1>My coding log</h1>
          <div>
            <h6>Pick a starting date :</h6>
            <DatePicker
              id='start_date_picker'
              defaultDate={this.state.startingDate}
              onChange={this.handleChangeDate}
              // style={styles.datePicker}
            />
            <h2>{this.state.daysCounter}</h2>
          </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
