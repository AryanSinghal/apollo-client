import { gql } from 'apollo-boost';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export default LOGIN_USER;
