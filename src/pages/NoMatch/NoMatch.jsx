import React from 'react';
import { Typography } from '@material-ui/core';

const NoMatch = () => (
  <div align="center">
    <Typography gutterBottom variant="h3">
        Not Found
    </Typography>
    <Typography variant="h6">
        Seems like page you are looking for does not exist
    </Typography>
  </div>
);

export default NoMatch;
