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
    currentTime: PropTypes.number.isRequired,
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
    const newList = [];
    for (let i = 0; i < result.length; i++){
      newList[i] = result[i].toString();
      if (result[i] < 10) {
        newList[i] = "0" + newList[i];
      }
    }
    return newList.join(":");
  }

  

  render() {
    const {timePerDay, currentTime} = this.props;
    return (
      <div>
        <h1 style={styles.counter}>{this.timeToString(currentTime)}</h1>
        <h3>You're getting close !</h3>
        <ProgressBar counter={Math.floor((currentTime / timePerDay) * 100)} />
      </div>
    )
  }
}


export default TimerView;
