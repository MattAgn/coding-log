import React, { Component } from 'react';
import Settings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

const styles = {
  datePicker: {
    width: 'fit-content',
  },
  dateText: {
    width: 'fit-content',
    color: 'black',
    maxWidth: '80%',
  },
  settingName: {
    margin: '5vh 0px 0px 0px', 
    color:'black', 
    fontWeight: '400', 
    display: 'inline-block'
  },
  settingRow: {
    display: 'flex',
    alignItems: 'baseline',
  }
}

class MySettings extends Component {
  // eslint-disable-next-line 
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = () => {
    this.props.handleSave();
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSave}
      />,
    ];

    return (
      <React.Fragment>
        <IconButton 
        tooltip="settings" 
        onClick={this.handleOpen} 
        style={this.props.buttonStyle}
        iconStyle={this.props.iconStyle}>
          <Settings color="#E0E0E0"/>
        </IconButton>
        <Dialog
          title="Settings"
          actions={actions}
          modal={true}
          open={this.state.open}
          style={{color:'black'}}
          >
          <div style={styles.settingRow}>
            <h4 style={styles.settingName}>Starting date : </h4>
            <DatePicker
              style={{display: 'inline-block'}}
              textFieldStyle={styles.dateText}
              id='start_date_picker'
              defaultDate={this.props.startingDate}
              onChange={this.props.handleChangeDate}
            />
          </div>
          <div style={styles.settingRow}>
            <h4 style={styles.settingName}>Number of days to reach :</h4>
            <TextField
              style={{display: 'inline-block', width:'fit-content'}}
              onChange={this.props.handleChangeGoal}
              id="text-field-goal"
              defaultValue={this.props.goal}
            />
          </div>    
        </Dialog>
      </React.Fragment>
    )
  }
}


export default MySettings;