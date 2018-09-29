import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import encouragements from '../../assets/encouragements';
import '../../style.css';

import ProgressBar from '../common/ProgressBar';
import PlayButtons from './PlayButtons';

class TimerView extends Component {
  static propTypes = {
    timePerDay: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    isOnClockMode: PropTypes.bool.isRequired,
    isClockPaused: PropTypes.bool.isRequired
  };

  // shouldComponentUpdate(nextProps, nextState){
  //   if (Radium.getState(this.state, "timerViewContainer", ':hover') !== Radium.getState(nextState, 'timerViewContainer', ':hover')) {
  //     return true;
  //   } else if (
  //     nextProps.currentTime !== this.props.currentTime ||
  //     nextProps.isOnClockMode !== this.props.isOnClockMode ||
  //     nextProps.isClockPaused !== this.props.isClockPaused
  //   ) {
  //     return true
  //   }
  //   return false
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('Current state: ', Radium.getState(this.state, 'timerViewContainer', ':hover'));
  //   console.log('Next state: ', Radium.getState(nextState, 'timerViewContainer', ':hover'));

  //   return (Radium.getState(nextState, 'timerViewContainer', ':hover') !== Radium.getState(this.state, 'timerViewContainer', ':hover'));
  // }

  timeToString(time) {
    let result = [];
    const hours = Math.floor(time / 3600) > 0;
    if (hours > 0) {
      result[0] = hours;
      result[1] = Math.floor(time / 60); //min
    } else {
      result[0] = Math.floor(time / 60); //min
      result[1] = time % 60; // seconds
    }
    const newList = [];
    for (let i = 0; i < result.length; i++) {
      newList[i] = result[i].toString();
      if (result[i] < 10) {
        newList[i] = '0' + newList[i];
      }
    }
    return newList.join(':');
  }

  render() {
    const {
      timePerDay,
      currentTime,
      isOnClockMode,
      ...playButtonsProps
    } = this.props;
    const progress = Math.floor((currentTime / timePerDay) * 100);
    // const isHovered = Radium.getState(this.state, 'timerViewContainer',':hover');
    // console.log(isHovered);
    return (
      <div
        className={isOnClockMode ? 'front' : 'back'}
        key="timerViewContainer"
        style={styles.container}
      >
        <h1 style={styles.counter} key="titleKey">
          {this.timeToString(currentTime)}
        </h1>
        <h3>{encouragements[Math.floor(progress / 10)]}</h3>
        <ProgressBar isOnClockMode counter={progress} />
        <PlayButtons
          isClockPaused
          styleButtons={styles.buttons}
          styleIcons={styles.icon}
          {...playButtonsProps}
        />
      </div>
    );
  }
}

const styles = {
  counter: {
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '8%',
    transitionDuration: '0.8s',
    transitionTimingFunction: 'ease-in-out',
    transitionProperty: 'background-color, color, opacity',
    pointerEvents: 'none'
    // ':hover': {
    //   color: 'blue',
    // }
  },
  buttons: {
    width: '30%',
    height: '50%'
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  container: {
    ':hover': {}
  }
};

export default Radium(TimerView);