import { gql } from 'apollo-boost';

const TRAINEE_UPDATED = gql`
  subscription TraineeUpdated {
        traineeUpdated {
        id
        name
        email
      }
    },
`;

const TRAINEE_DELETED = gql`
  subscription TraineeDeleted {
    traineeDeleted
    }
`;

export { TRAINEE_UPDATED, TRAINEE_DELETED };
