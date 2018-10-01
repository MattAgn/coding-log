import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from 'react-animated-number';

import ProgressBar from './ProgressBar';
import MainNumber from '../common/MainNumber';

const getCounter = (daysCount, goal) => Math.floor((daysCount / goal) * 100);

class GlobalView extends Component {
  state = {
    counter: getCounter(this.props.daysCount, this.props.goal)
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      counter: getCounter(nextProps.daysCount, nextProps.goal)
    };
  }

  render() {
    const { daysCount, isOnClockMode } = this.props;
    return (
      <div className={isOnClockMode ? 'back' : 'front'}>
        <AnimatedNumber
          component={MainNumber}
          value={daysCount}
          style={styles.counter}
          duration={700}
          stepPrecision={0}
        />
        <h3>days of coding everyday so far !</h3>
        <ProgressBar counter={this.state.counter} />
      </div>
    );
  }
}

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
