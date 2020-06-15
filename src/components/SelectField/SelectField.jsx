import React from 'react';
import PropTypes from 'prop-types';
import { Select, Option, Error } from './style';

export const SelectField = (props) => {
  const {
    error, options, onChange, defaultText, value, onBlur,
  } = props;
  return (
    <>
      <Select defaultValue={value} onChange={onChange} onBlur={onBlur}>
        {defaultText && <Option value="">{defaultText}</Option>}
        {
          options && options.length && options.map((option) => (
            <Option key={option.label} value={option.value}>{option.label}</Option>
          ))
        }
      </Select>
      <Error>{error}</Error>
    </>
  );
};

SelectField.propTypes = {
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
  defaultText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

SelectField.defaultProps = {
  error: '',
  defaultText: '',
};
