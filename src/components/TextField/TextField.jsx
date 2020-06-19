import React from 'react';
import PropTypes from 'prop-types';
import { MyStyle, Error } from './style';

const TextField = (props) => {
  const {
    disabled, value, error, onChange, onBlur,
  } = props;
  return (
    <>
      <MyStyle type="text" className={(error) ? 'error' : ''} disabled={disabled} onBlur={onBlur} placeholder={value} onChange={onChange} />
      <Error>{error}</Error>
    </>
  );
};

TextField.propTypes = {
  disabled: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

TextField.defaultProps = {
  disabled: '',
  error: '',
  value: '',
  onBlur: () => { },
  onChange: () => { },
};

export default TextField;
