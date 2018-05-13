import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';
import ProgressBar from '../ProgressBar';

const styles = {
  counter: {
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '10%',
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity',
  },
};


class TimerView extends Component {
  static propTypes = {
    timePerDay: PropTypes.number.isRequired,
  }

  state = {
    currentTime: 0,
    isPaused: true, 
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handlePauseTimer);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handlePauseTimer);
  }

  // componentDidUpdate() {
  //   console.log('to');
  //   if (!this.state.isPaused) {
  //     setInterval(this.handleRunClock, 1000);
  //   }
  // }

  handlePauseTimer = (event) => {
    if (event.keyCode === 32 || event.wich === 32) {
      event.preventDefault();
      this.setState(prevState => ({isPaused: !prevState.isPaused}));
      const interval = setInterval(this.runClock, 1000);
      if (this.state.isPaused) {
        clearInterval(interval);
      }
    }
  }

  runClock = () => {
    if (!this.state.isPaused) {
      this.setState(prevState => ({
        currentTime: prevState.currentTime + 1
      }))

    }
  }

  timeToString(time) {
    let result = [];
    const hours = Math.floor(time / 3600) > 0;
    if (hours > 0) {
      result[0] = hours;
      result[1] = Math.floor(time / 60); //min
      result[2] = time % 60; // seconds
    } else {
      result[0] = Math.floor(time / 60); //min
      result[1] = time % 60; // seconds
    }
    for (let item of result) {
      console.log(item);
      if (item < 10) {
        item = "0" + item.toString();
      }
    }
    return result.join(":");
  }

  

  render() {
    const currentTime  = this.state.currentTime;
    const timePerDay = this.props.timePerDay;

    return (
      <div>
        <h1 style={styles.counter}>{this.timeToString(this.state.currentTime)}</h1>
        <h3>seconds passed</h3>
        <ProgressBar counter={Math.floor((currentTime / timePerDay) * 100)} />
      </div>
    )
  }
}


export default TimerView;
