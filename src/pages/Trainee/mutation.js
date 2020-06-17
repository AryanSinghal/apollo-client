import { gql } from 'apollo-boost';

const ADD_TRAINEE = gql`
  mutation CreateTrainee($name: String!, $email: String!, $password: String!) {
    createTrainee(user: { name: $name, email: $email, password: $password }) {
        name
        email
        role
      },
    },
`;

const EDIT_TRAINEE = gql`
  mutation UpdateTrainee($id: ID!, $name: String, $email: String) {
    updateTrainee(user: { id: $id, name: $name, email: $email }) {
        name
        email
      },
    },
`;

const DELETE_TRAINEE = gql`
  mutation DeleteTrainee($id: ID!) {
    deleteTrainee(id: $id)
    }
`;

export { ADD_TRAINEE, EDIT_TRAINEE, DELETE_TRAINEE };
