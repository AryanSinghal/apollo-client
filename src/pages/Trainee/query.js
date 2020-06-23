import { gql } from 'apollo-boost';

const GET_TRAINEES = gql`
  query GetAllTrainees($skip: Int!, $limit: Int!) {
    getAllTrainees (skip: $skip, limit: $limit){
      count
      records {
        name
        email
        originalId
        createdAt
      }
    }
  }
`;

export default GET_TRAINEES;
