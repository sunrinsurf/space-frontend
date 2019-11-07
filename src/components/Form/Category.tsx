import styled, { css } from 'styled-components';

const Category = styled.div<{ select?: boolean }>`
  padding: 1em;
  border-radius: 30px;
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
      background: #ddd;
    `;
  }}
`;

export default Category;