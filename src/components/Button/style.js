import styled from 'styled-components';

const ButtonStyle = styled.button`{
    padding: 1%;
    border-radius: 4px;
    border: grey solid 1px;
    color: black;
    font-weight: 550;
  }
  &.success{
    background-color: green;
  }
  &.disabled{
    color: grey;
    border-style: none;
  }`;
export default ButtonStyle;
