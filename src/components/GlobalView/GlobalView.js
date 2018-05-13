import React from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';
import ProgressBar from '../ProgressBar';

const styles = {
  counter: {
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '8%',
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity',
  },
};

const GlobalView = ({ daysCount, goal, isOnClockMode }) => (
  <div className={isOnClockMode ? 'back' : 'front'}>
    <AnimatedNumber
      component="h1"
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
  isOnClockMode: PropTypes.bool.isRequired,
};

export default GlobalView;
