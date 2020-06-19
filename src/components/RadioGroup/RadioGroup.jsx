import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Error from './style';

export const RadioGroup = (props) => {
  const {
    value, error, options, onChange, onBlur,
  } = props;
  return (
    <>
      {
        options && options.length && options.map((option) => (
          <Fragment key={option.value}>
            <input type="radio" name="specialty" value={option.value} onChange={onChange} onBlur={onBlur} defaultChecked={value === option.value} />
            {option.label}
            <br />
          </Fragment>
        ))
      }
      <Error>{error}</Error>
    </>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  value: '',
  error: '',
};
