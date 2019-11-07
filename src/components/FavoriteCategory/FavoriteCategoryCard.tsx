import React from "react";
import styled, { css } from "styled-components";

const Wrap = styled.div`
  margin: 1em 2em;
`;
interface ThumbProps {
  image?: string;
}
const Thumb = styled.div<ThumbProps>`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  ${props => {
    if (props.image) {
      return css`
        background: url(${props.image});
        background-size: cover;
        background-position: center;
      `;
    }
    return css`
      background: gray;
    `;
  }}
`;
const Title = styled.div`
  margin-top: 1em;
  text-align: center;
  & h3 {
    font-size: 1.5em;
  }
`;

interface FavoriteCategoryCardProps {
  title: string;
  image?: string;
}
function FavoriteCategoryCard({ title, image }: FavoriteCategoryCardProps) {
  return (
    <Wrap>
      <Thumb image={image} />
      <Title>
        <h3>{title}</h3>
      </Title>
    </Wrap>
  );
}

export default FavoriteCategoryCard;
