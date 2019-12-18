import React from "react";
import { Link } from "react-router-dom";
import getClassHandler from "../../lib/getClassHandler";
import styled, { css } from "styled-components";
import "./ShareCard.css";
import { baseURL } from "../../lib/api/client";

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
        background: url(${baseURL + '/shop/image/' + props.image + '/thumbnail'});
        background-size: cover;
        background-position: center;
      `;
    }
    return css`
      /* background: gray; */
    `;
  }}

  @media (max-width: 640px) {
    width: 100px;
    height: 100px;
  }
`;
const getName = getClassHandler("ShareCard");

function ShareCard({ title, image, id }: ShareCardProps) {
  return (
    <Link className={getName("wrap")} to={`/product/${id}`}>
      <div className={getName("thumbWrap")}>
        <Thumb image={image} />
      </div>
      <div className={getName("title")}>
        <h3>{title}</h3>
      </div>
    </Link>
  );
}

export default ShareCard;
