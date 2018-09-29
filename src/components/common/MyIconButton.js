import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const MyIconButton = ({ children, handleClick, tooltip, iconSize }) => (
  <IconButton
    onClick={handleClick}
    style={styles.button}
    tooltip={tooltip}
    iconStyle={{ width: iconSize, height: iconSize }}
  >
    {children}
  </IconButton>
);

MyIconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string
};

MyIconButton.defaultProps = {
  iconSize: 30
};

const styles = {
  button: {
    height: '70',
    marginLeft: '10',
    width: '70',
    padding: '16'
  }
};

export default MyIconButton;
