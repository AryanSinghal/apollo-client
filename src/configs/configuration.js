import { config } from 'dotenv';

config();

const configuration = {
  baseUrl: process.env.REACT_APP_BASE_URL
};

Object.freeze(configuration);

export default configuration;
