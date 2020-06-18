import { config } from 'dotenv';

config();

const configuration = {
  apolloGraphqlURI: process.env.REACT_APP_APOLLO_GRAPHQL_URL,
  webSocketURI: process.env.REACT_APP_WEB_SOCKET_URL,
};

Object.freeze(configuration);

export default configuration;
