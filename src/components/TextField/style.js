import styled from 'styled-components';

export const MyStyle = styled.input`{
    width: 97%;
    height: 20%;
    padding: 1%;
    border-radius: 4px;
    border: grey solid 1px;
  }
  &.error{
    border: red solid 1px;
  }`;

export const Error = styled.p`{
  color: red;
}`;
