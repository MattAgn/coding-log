import React from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';

import ProgressBar from './ProgressBar';
import MainNumber from '../common/MainNumber';

const GlobalView = ({ daysCount, goal, isOnClockMode }) => (
  <div className={isOnClockMode ? 'back' : 'front'}>
    <AnimatedNumber
      component={MainNumber}
      value={daysCount}
      style={styles.counter}
      duration={700}
      stepPrecision={0}
    />
    <h3>days of coding everyday so far !</h3>
    <ProgressBar counter={Math.floor((daysCount / goal) * 100)} />
  </div>
);

GlobalView.propTypes = {
  daysCount: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  isOnClockMode: PropTypes.bool.isRequired
};

const styles = {
  counter: {
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity'
  }
};

export default GlobalView;
