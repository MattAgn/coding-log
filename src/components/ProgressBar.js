import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
  bar: {
    height: '20px',
    width: '50vw',
    margin: '6% auto',
    borderRadius: '5px',
  },
};


export default class LinearProgressExampleDeterminate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(this.props.counter, this.props.counter), 400);
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
      <LinearProgress style={styles.bar} mode="determinate" value={this.state.completed} />
    );
  }
}
