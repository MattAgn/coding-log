import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import ResetIcon from 'material-ui/svg-icons/av/replay';
import IconButton from 'material-ui/IconButton/IconButton';
import ProgressBar from '../ProgressBar';
import '../../index.css'; 

const styles = {
  counter: {
    fontSize: '20vh',
    marginBottom: 0,
    marginTop: '8%',
    transition: '0.8s ease-out',
    transitionProperty: 'background-color, color, opacity',
  },
  buttons: {
    width: '30%',
    height: '50%',
  },
  icon: {
    width: '100%',
    width: '100%',
  }
};


class TimerView extends Component {
  static propTypes = {
    timePerDay: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    isOnClockMode: PropTypes.bool.isRequired,
    isClockPaused: PropTypes.bool.isRequired,
  }

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
    for (let i = 0; i < result.length; i++){
      newList[i] = result[i].toString();
      if (result[i] < 10) {
        newList[i] = "0" + newList[i];
      }
    }
    return newList.join(":");
  }

  //

  render() {
    const {timePerDay, currentTime, isOnClockMode, onClickPlay, onClickReset} = this.props;
    return (
      <div className={`${isOnClockMode ? "front" : "back"} timer-view`}>
        <h1 style={styles.counter}>{this.timeToString(currentTime)}</h1>
        <h3>You're getting close !</h3>
        <ProgressBar 
          isOnClockMode
          counter={Math.floor((currentTime / timePerDay) * 100)} />
        <div className="playButtons">
          <IconButton 
            style={styles.buttons} 
            iconStyle={styles.icon}
            onClick={onClickPlay}>
            { this.props.isClockPaused ? 
              <PlayArrowIcon color="#E0E0E0"/>
            : <PauseIcon color="#E0E0E0"/>}
          </IconButton>
          <IconButton 
            style={styles.buttons}  
            iconStyle={styles.icon}
            onClick={onClickReset}>
            <ResetIcon color="#E0E0E0"/>
          </IconButton>
        </div>
      </div>
    )
  }
}


export default TimerView;
