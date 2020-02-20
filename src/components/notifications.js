import React, { Component } from 'react';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import { MDBIcon } from 'mdbreact';

export default class Notifications extends Component {
  state = {
    ntf: false,
  }

  showNtf = () => {
    this.setState({
      ntf: true,
    });
  }

  closeNtf = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      ntf: false,
    });
  };

  render () {
    return (
      <div>
      <Button onClick={this.showNtf}>Open simple snackbar</Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.ntf}
        autoHideDuration={6000}
        onClose={this.closeNtf}
        message="Note archived"
        action={
          <React.Fragment>
            <IconButton  className='mr-2' size="small" aria-label="close" color="inherit" onClick={this.closeNtf}>
              <MDBIcon icon='times' />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
    );
  }
}
