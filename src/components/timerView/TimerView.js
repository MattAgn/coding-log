import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import encouragements from '../../assets/encouragements';
import '../../style.css';

import PlayButtons from './PlayButtons';
import MainNumber from '../common/MainNumber';

class TimerView extends Component {
  static propTypes = {
    timePerDay: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    isOnClockMode: PropTypes.bool.isRequired,
    isClockPaused: PropTypes.bool.isRequired
  };

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

    return (
      <div
        className={isOnClockMode ? 'front' : 'back'}
        key="timerViewContainer"
      >
        <MainNumber key="titleKey">{this.timeToString(currentTime)}</MainNumber>
        <h3>{encouragements[Math.floor(progress / 10)]}</h3>
        <PlayButtons isClockPaused {...playButtonsProps} />
      </div>
    );
  }
}

export default Radium(TimerView);
