import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';

class EditDialog extends React.Component {
  render() {
    const {
      open, onSubmit, onClose, data, progressBar,
    } = this.props;
    return (
      <>
        <Dialog
          fullWidth
          open={open}
          onClose={onClose}
        >
          <DialogTitle>Edit Trainee</DialogTitle>
          <form onSubmit={onSubmit}>
            <DialogContent>
              <DialogContentText>
                Enter your trainee details
              </DialogContentText>
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                onChange={this.handleNameChange}
                defaultValue={data.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                fullWidth
                required
                id="email"
                onChange={this.handleEmailChange}
                label="Email Address"
                defaultValue={data.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                endIcon={
                  (progressBar)
                    ? <CircularProgress />
                    : ''
                }
                type="submit"
                color="primary"
                autoFocus
                disabled={progressBar}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
}

EditDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  progressBar: PropTypes.bool.isRequired,
};

export { EditDialog };
