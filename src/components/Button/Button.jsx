import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from './style';

export const Button = (props) => {
  const {
    value, onClick, disabled, success,
  } = props;
  return (
    <>
      <ButtonStyle type="button" disabled={disabled} className={success} onClick={onClick}>{value}</ButtonStyle>
    </>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  style: PropTypes.object,
};

Button.defaultProps = {
  error: false,
  style: {},
  color: 'default',
  disabled: '',
};
