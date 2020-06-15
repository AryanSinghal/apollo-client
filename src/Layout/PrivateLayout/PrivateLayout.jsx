import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Navbar } from '../components';

const PrivateLayout = (props) => {
  const { children } = props;
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Navbar />
      <br />
      {children}
    </>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default PrivateLayout;
