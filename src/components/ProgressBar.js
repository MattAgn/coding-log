import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types';

const styles = {
  bar: {
    height: '20px',
    width: '74%',
    margin: '6% auto',
    borderRadius: '5px',
  },
};

class ProgressBar extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
  }
  
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => 
      this.progress(0, this.props.counter)
    , 100);
  }

  shouldComponentUpdate(nextProps, prevState) {
    if (prevState.completed === nextProps.counter) {
      return false;
    } else if (nextProps.isOnClockMode) {
      this.setState({completed: nextProps.counter})
    } 
    return true;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed, maxValue) {
    if (completed > maxValue) {
      this.setState({ completed: maxValue });
    } else {
      this.setState({ completed });
      const diff = 1;
      this.timer = setTimeout(() => this.progress(completed + diff, maxValue), 500/maxValue);
    }
  }

  render() {
    return (
      <LinearProgress 
        style={styles.bar} 
        mode="determinate" 
        value={this.state.completed} />
    );
  }
}


export default ProgressBar;
