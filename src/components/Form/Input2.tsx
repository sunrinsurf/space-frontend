import styled, { css } from "styled-components";

const styles = css`
 width:100%;
  display: block;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.50em 1em;
  margin: 0.7em 0;
  background: #fefefe;
  border-radius:4px;
  border: solid 1px #cecece;
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
