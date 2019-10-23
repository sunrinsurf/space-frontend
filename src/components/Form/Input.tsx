import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.2rem;
  padding: 1em 1.5em;
  border: 1px solid #b3b3b3;
  border-radius: .5em;
  margin: .7em 0;
  &:focus {
    outline: 0;
  }
`;

export default Input;
