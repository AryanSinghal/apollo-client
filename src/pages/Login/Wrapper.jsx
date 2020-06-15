import React from 'react';
import { Mutation } from '@apollo/react-components';
import PropTypes from 'prop-types';
import LOGIN_USER from './mutation';
import Login from './Login';

const Wrapper = (props) => (
  <Mutation mutation={LOGIN_USER}>
    {
      (loginUser) => <Login loginUser={loginUser} history={props.history} />
    }
  </Mutation>
);

Wrapper.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Wrapper;
