import styled, { css } from 'styled-components';

const Category = styled.div<{ select?: boolean }>`
  padding: .5em 1em;
  border-radius: 30px;
  width: fit-content;
  margin: 10px;
  transition: background 0.5s, color 0.5s;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 100;
  font-size: 1.25em;

  .chip {
    margin-right: 10px;
  }
  ${props => {
    if (props.select) {
      return css`
        color: white;
        background: #328fff;
      `;
    }
    return css`
      background: #aaaaaa;
    `;
  }}
`;

export default Category;