import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.25em 0.5em;
  border: 0;
  box-shadow: 0 2px #6b32a8;
  transition: box-shadow 1s;
  margin: 0 0.5em;
  &:focus {
    outline: 0;
    box-shadow: 0 2px #3f1e63;
  }
`;

export default Input;
