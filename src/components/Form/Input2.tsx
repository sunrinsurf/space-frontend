import styled, { css } from "styled-components";

const styles = css`
 width:100%;
  display: block;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.50em 1em;
  border-radius: 0.5em;
  margin: 0.7em 0;
  background: #fefefe;
  box-shadow: 5px 3px 10px -1px rgba(34, 34, 34, 0.2);
  border: 0;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #b3b3b3;
  }
`;
const Input2 = styled.input`
  ${styles}
`;
export const TextArea = styled.textarea`
  ${styles}
  resize: vertical;
`;

export default Input2;
