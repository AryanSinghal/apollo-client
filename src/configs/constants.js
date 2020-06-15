import * as yup from 'yup';
import moment from 'moment';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'banners/default.png';
export const BANNERS = ['banners/cloud.jpg', 'banners/dns-server.png', 'banners/full-stack-web-development.jpg', 'banners/js.jpg', 'banners/load-balancer.png'];
export const TOTAL = 5;
export const DURATION = 3000;
export const NAME = 'Aryan';
export const GAME = 'cricket';
export const SPECIALTY = 'batsman';

export const SELECT_OPTIONS = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];

export const CRICKET_OPTIONS = [
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Wicket Keeper',
    value: 'wicket_keeper',
  },
  {
    label: 'All Rounder',
    value: 'all_rounder',
  },
];

export const FOOTBALL_OPTIONS = [
  {
    label: 'Attacker',
    value: 'attacker',
  },
  {
    label: 'Defender',
    value: 'defender',
  },
  {
    label: 'Goal Keeper',
    value: 'goal keeper',
  },
];

export const CRICKET = 'cricket';
export const FOOTBALL = 'football';
export const OPERATORS = ['+', '-', '/', '*'];

export const DIALOG_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field'),
  email: yup
    .string()
    .email()
    .required('Email is required field'),
  password: yup
    .string()
    .required('Password is required field')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'),
  confirmPassword: yup
    .string()
    .when('$password', (password) => (yup.string().oneOf([password, null, ''], 'Passwords must match').required('Confirm Password is required'))),
});

export const LOGIN_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required field'),
  password: yup
    .string()
    .required('Password is required field'),
});

export const INPUT_DEMO_SCHEMA = yup.object().shape({
  sport: yup.string().required('Sport is required field'),
  name: yup.string().required('Name is required field').min(3, 'Name is required field'),
  cricket: yup.string().required('What you Do is required field'),
  football: yup.string().required('What you Do is required field'),
});

export const COLUMNS = [
  {
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    field: 'email',
    label: 'Email Address',
    format: value => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: date => moment(date).format('dddd MMMM Do YY h:mm:ss a'),
  }
];

export const ROWS_PER_PAGE = 20;
export const SKIP = 0;
export const SUCCESS_MESSAGE = 'This is a success message!';
export const FAILURE_MESSAGE = 'This is an error message!';
export const LOGIN_URL = 'user/login';
export const TRAINEE_PATH = 'trainee';
