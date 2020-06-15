import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Math extends Component {
  calResult = (first, second, operator) => {
    let result;
    switch (operator) {
    case '+':
      result = first + second;
      break;
    case '-':
      result = first - second;
      break;
    case '/':
      result = first / second;
      break;
    case '*':
      result = first * second;
      break;
    default:
      result = 'Invalid Operation';
    }
    return result;
  };

  render() {
    const {
      first, second, operator, children,
    } = this.props;
    const result = this.calResult(Number(first), Number(second), operator);
    return (children !== undefined)
      ? (<p>{children(first, second, operator, result)}</p>)
      : (<p>{`${first} ${operator} ${second} = ${result}`}</p>);
  }
}

Math.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  operator: PropTypes.oneOf(['+', '-', '/', '*']).isRequired,
  children: PropTypes.func,
};

Math.defaultProps = {
  children: undefined,
};
