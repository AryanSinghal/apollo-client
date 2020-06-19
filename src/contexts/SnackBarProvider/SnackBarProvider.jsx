import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

export const SnackBarContext = React.createContext();

export class SnackbarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: '',
      message: '',
    };
  }

  openSnackBar = (status, message) => {
    this.setState({ open: true, status, message });
  }

  closeSnackBar = () => {
    this.setState({ open: false, status: '', message: '' });
  }

  render() {
    const { open, message, status } = this.state;
    const { children } = this.props;
    return (
      <>
        <SnackBarContext.Provider value={{ openSnackbar: this.openSnackBar }}>
          {children}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={this.closeSnackBar}
          >
            <Alert onClose={this.closeSnackBar} variant="filled" severity={status || 'info'}>
              {message}
            </Alert>
          </Snackbar>
        </SnackBarContext.Provider>
      </>
    );
  }
}

export const SnackbarConsumer = SnackBarContext.Consumer;
