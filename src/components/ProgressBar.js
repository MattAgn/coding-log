import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types';

const styles = {
  bar: {
    height: '20px',
    width: '50vw',
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
      this.progress(this.props.counter, this.props.counter)
    , 400);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {completed: 0}
  }

  shouldComponentUpdate(nextProps, prevState) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => 
      this.progress(this.props.counter, this.props.counter)
    , 400);
    //TODO: to change
    if (nextProps.counter - this.props.counter < 0.01) {
      return false;
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
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff, maxValue), 1000);
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
