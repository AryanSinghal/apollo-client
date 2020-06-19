import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../Layout';

const PrivateLayoutRoute = ({ component: Component, ...rest }) => (
  <>
    <Route
      {...rest}
      render={(matchProps) => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    />
  </>
);

PrivateLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateLayoutRoute;
