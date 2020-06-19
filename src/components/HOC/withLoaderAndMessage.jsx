import React, { Component } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

const withLoaderAndMessage = (WrappedComponent) => {
  class WithLoaderAndMessage extends Component {
    render() {
      const { loader, dataLength, ...rest } = this.props;
      return (
        <>
          <WrappedComponent {...rest} />
          <br />
          <div align='center'>
            {
              (loader)
                ? <CircularProgress size={70} />
                : ''
            }
            {
              (!dataLength && !loader)
                ? <>
                  <Typography variant="h6" gutterBottom>
                    OOPS!, No More Trainees
                  </Typography>
                  <br />
                  </>
                : ''
            }
          </div>
        </>
      );
    }
  }
  return WithLoaderAndMessage;
}

export default withLoaderAndMessage;
