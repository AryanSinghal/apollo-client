import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = (props) => {
  const { children } = props;
  if (localStorage.getItem('token')) {
    return <Redirect to="/trainee" />;
  }
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default AuthLayout;
