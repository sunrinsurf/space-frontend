import styled, { css } from 'styled-components';

const Category = styled.div<{ select?: boolean }>`
  padding: 1em;
  border-radius: 10px;
  width: fit-content;
  margin: 10px;
  transition: background 0.5s, color 0.5s;
  cursor: pointer;
  ${props => {
    if (props.select) {
      return css`
        color: white;
        background: #fd437c;
      `;
    }
    return css`
      background: #b4b4b4;
    `;
  }}
`;

export default Category;