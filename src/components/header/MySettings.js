import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Settings from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import MyIconButton from '../common/MyIconButton';

class MySettings extends Component {
  static propTypes = {
    handleClickSave: PropTypes.func.isRequired,
    goal: PropTypes.number.isRequired,
    timePerDay: PropTypes.number.isRequired
  };

  state = {
    open: false,
    inputTimePerDay: this.props.timePerDay,
    inputGoal: this.props.goal
  };

  handleChangeGoal = event => {
    const value = event.target.value;
    this.setState(() => ({
      inputGoal: parseInt(value, 10)
    }));
    console.log(value);
  };

  handleChangeTimePerDay = event => {
    const value = event.target.value;
    const chosenTime = value
      .split(':')
      .reverse()
      .reduce((res, cur, index) => {
        res += cur * Math.pow(60, index + 1);
        return res;
      }, 0);
    if (parseInt(value, 10) < 0) {
      alert("Aren't you lazy ? Please enter a time greater than 0");
    } else {
      this.setState(() => ({
        inputTimePerDay: chosenTime
      }));
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickSave = () => {
    const { inputGoal, inputTimePerDay } = this.state;
    this.props.handleClickSave({ inputGoal, inputTimePerDay });
    this.handleClose();
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClickSave}
      />
    ];

    return (
      <React.Fragment>
        <MyIconButton
          disableKeyboardFocus
          tooltip="Settings"
          handleClick={this.handleOpen}
        >
          <Settings color="#E0E0E0" />
        </MyIconButton>
        <Dialog
          title="Settings"
          actions={actions}
          modal={true}
          open={this.state.open}
          style={{ color: 'black' }}
        >
          <h5 style={styles.text}>
            Inital rules of the 100 days of code challenge: code everyday for 1
            hour for a 100 days straight! But feel free to set your own
            objectives that corresponds you best.
          </h5>
          <div style={styles.settingRow}>
            <h5 style={styles.text}>Number of days to reach :</h5>
            <TextField
              style={styles.textField}
              onChange={this.handleChangeGoal}
              defaultValue={this.props.goal}
              id="input_goal"
            />
          </div>
          <div style={styles.settingRow}>
            <h5 style={styles.text}>Time per day :</h5>
            <TextField
              style={styles.textField}
              onChange={this.handleChangeTimePerDay}
              hintText="(hh):mm"
              id="input_time_per_day"
            />
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const styles = {
  datePicker: {
    width: 'fit-content'
  },
  dateText: {
    width: 'fit-content',
    color: 'black',
    maxWidth: '80%'
  },
  text: {
    margin: '5vh 0px 0px 0px',
    color: 'black',
    fontWeight: '500',
    marginRight: '3%',
    display: 'inline-block'
  },
  settingRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline'
  },
  textField: {
    width: '80%'
  }
};

export default MySettings;
