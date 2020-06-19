import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { AuthLayout } from '../Layout';

const AuthLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

AuthLayoutRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

export default AuthLayoutRoute;
