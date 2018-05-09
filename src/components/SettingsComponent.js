import React, { Component } from 'react';
import Settings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker'

const styles = {
  datePicker: {
    width: 'fit-content',
  },
  dateText: {
    width: 'fit-content',
    color: 'black'
  },
  largeIcon: {
    width: 30,
    height: 30,
  },
  settingsButton: {
    height: '70',
    width: '70',
    padding: '16',
    position: 'absolute',
    right: '5%',
    display: 'inline-block',
  }
}

export default class SettingsComponent extends Component {
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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <React.Fragment>
        <IconButton 
        tooltip="settings" 
        onClick={this.handleOpen} 
        style={styles.settingsButton}
        iconStyle={styles.largeIcon}>
          <Settings color="#E0E0E0"/>
        </IconButton>
        <Dialog
          title="Settings"
          actions={actions}
          modal={true}
          open={this.state.open}
          >
          <h4 style={{margin: '5vh 0px 0px 0px', color:'black', fontWeight: '400'}}>
                Starting date
              </h4>
              <DatePicker
                style={{display: 'inline-block'}}
                textFieldStyle={styles.dateText}
                id='start_date_picker'
                defaultDate={this.props.startingDate}
                onChange={this.props.handleChangeDate}
              />
          </Dialog>
      </React.Fragment>
    )
  }
}
