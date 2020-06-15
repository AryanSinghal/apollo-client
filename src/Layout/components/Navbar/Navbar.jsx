import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const ButtonAppBar = () => {
  const history = useHistory();

  const handleLogout = (path) => {
    localStorage.removeItem('token');
    history.push(path);
  };

  const handleOnClick = (path) => {
    history.push(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h6">
              Trainee Portal
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button onClick={() => handleOnClick('/trainee')} color="inherit" variant="text">
              TRAINEE
            </Button>
            <Button onClick={() => handleOnClick('/textfield-demo')} color="inherit" variant="text">
              TEXTFIELD DEMO
            </Button>
            <Button onClick={() => handleOnClick('/input-demo')} color="inherit" variant="text">
              INPUT DEMO
            </Button>
            <Button onClick={() => handleOnClick('/children-demo')} color="inherit" variant="text">
              CHILDREN DEMO
            </Button>
            <Button onClick={() => handleLogout('/login')} color="inherit" variant="text">
              LOGOUT
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ButtonAppBar;
