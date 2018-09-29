import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import ResetIcon from 'material-ui/svg-icons/av/replay';

import MyIconButton from '../common/MyIconButton';

const PlayButtons = ({ isClockPaused, onClickPlay, onClickReset }) => (
  <div className="playButtons" style={styles.playButtonsContainer}>
    <MyIconButton handleClick={onClickPlay} iconSize={50}>
      {isClockPaused ? (
        <PlayArrowIcon color="#E0E0E0" />
      ) : (
        <PauseIcon color="#E0E0E0" />
      )}
    </MyIconButton>
    <MyIconButton handleClick={onClickReset} iconSize={50}>
      <ResetIcon color="#E0E0E0" />
    </MyIconButton>
  </div>
);

PlayButtons.propTypes = {
  isClockPaused: PropTypes.bool.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired
};

const styles = {
  playButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Radium(PlayButtons);
