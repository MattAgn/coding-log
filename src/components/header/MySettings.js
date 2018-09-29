import React, { Component } from 'react';
import Settings from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import MyIconButton from '../common/MyIconButton';

class MySettings extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.props.handleSave();
    this.handleClose();
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSave}
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
          <div style={styles.settingRow}>
            <h5 style={styles.settingName}>Number of days to reach :</h5>
            <TextField
              style={styles.textField}
              onChange={this.props.handleChangeGoal}
              id="text-field-goal"
              defaultValue={this.props.goal}
            />
          </div>
          <div style={styles.settingRow}>
            <h5 style={styles.settingName}>Time per day :</h5>
            <TextField
              style={styles.textField}
              onChange={this.props.handleChangeTimePerDay}
              id="text-field-time_per_day"
              hintText="(hh):mm"
              hintStyle={{ width: '100%' }}
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
  settingName: {
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
