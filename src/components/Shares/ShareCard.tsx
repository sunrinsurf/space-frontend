import React from "react";
import { useHistory } from "react-router-dom";
import getClassHandler from "../../lib/getClassHandler";
import styled, { css } from "styled-components";
/*image="https://avatars3.githubusercontent.com/u/23256775?s=460&v=4"*/
import "./ShareCard.css";

interface ShareCardProps {
  title: string;
  person: number;
  image?: string;
  id: string;
}
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

  @media (max-width: 640px) {
    width: 100px;
    height: 100px;
  }
`;
const getName = getClassHandler("ShareCard");

function ShareCard({ title, person, image, id }: ShareCardProps) {
  const history = useHistory();

  const onClick = React.useCallback(() => {
    history.push(`/product/${id}`);
  }, [history, id]);
  return (
    <div className={getName("wrap")} role="button" onClick={onClick}>
      <div className={getName("thumbWrap")}>
        <div className={getName("person")}>{person}</div>
        <Thumb image={image} />
      </div>
      <div className={getName("title")}>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default ShareCard;
