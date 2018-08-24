import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import ResetIcon from 'material-ui/svg-icons/av/replay';
import IconButton from 'material-ui/IconButton/IconButton';

const styles = {
  playButtonsContainer: {
    display: 'none',
    visibility: 'hidden',
    opacity: '0',
    backgroundColor: 'black',
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // transition: 'visibility 0ms, opacity 300ms ease-in-out',
    // width: '100%',
    // height: '100%',
    // position: 'absolute',
    // top: '0',
    // left: '0',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
    transitionProperty: '"opacity',
    // ':ho': {
    //   visibility: 'visible',
    //   display: 'flex',
    //   opacity: '0.9',
    // },
  },
  hovered: {
    visibility: 'visible',
    display: 'flex',
    opacity: '0.9',
  },
};

class PlayButtons extends Component {
  render() {
    return (
      <div className="playButtons" style={[styles.playButtonsContainer, this.props.isHovered && styles.hovered]}>
        <IconButton
          style={this.props.styleButtons}
          iconStyle={this.props.styleIcon}
          onClick={this.props.onClickPlay}
        >
          { this.props.isClockPaused ?
            <PlayArrowIcon color="#E0E0E0" />
          : <PauseIcon color="#E0E0E0" />}
        </IconButton>
        <IconButton
          style={this.props.styleButtons}
          iconStyle={this.props.styleIcon}
          onClick={this.props.onClickReset}
        >
          <ResetIcon color="#E0E0E0" />
        </IconButton>
      </div>
    );
  }
}


PlayButtons.propTypes = {
  isClockPaused: PropTypes.bool.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired,
};

export default Radium(PlayButtons);
