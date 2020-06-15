import React from 'react';
import { Mutation } from '@apollo/react-components';
import LOGIN_USER from './mutation';
import Login from './Login';

const Wrapper = (props) => (
  <Mutation mutation={LOGIN_USER}>
    {
      (loginUser) => <Login loginUser={loginUser} history={props.history} />
    }
  </Mutation>
);

export default Wrapper;