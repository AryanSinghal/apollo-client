import React from 'react';
import {
  BrowserRouter as Router, Switch, useParams,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  Typography, Card, CardContent, CardMedia, Grid,
} from '@material-ui/core';
import moment from 'moment';
import trainee from './data/trainee';
import { NoMatch } from '../NoMatch';

const TraineeDetails = () => {
  const { traineeId } = useParams();
  const data = trainee.filter((item) => item.id === traineeId);
  if (data[0] === undefined || data[0] === null) {
    return (
      <Router>
        <Switch>
          <NoMatch component={NoMatch} />
        </Switch>
      </Router>
    );
  }
  const { name, email, createdAt } = data[0];
  return (
    <>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              alt="Thumbnail"
              height="140"
              image="/images/banners/thumbnail.png"
              title={name}
            />
          </Grid>
          <Grid item xs={10}>
            <CardContent>
              <Typography variant="h6">
                {name}
              </Typography>
              <Typography variant="subtitle1">
                {moment(createdAt).format('dddd MMMM Do YY h:mm:ss a')}
              </Typography>
              <Typography variant="subtitle2">
                {email}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <br />
      <br />
      <br />
      <div align="center">
        <Button
          variant="contained"
          color="default"
          onClick={() => { window.history.back() }}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default TraineeDetails;
