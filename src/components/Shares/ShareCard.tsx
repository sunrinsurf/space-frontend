import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { baseURL } from "../../lib/api/client";
import favicon from "../../assets/favicon.svg";
import digitComma from "../../lib/digitComma";

interface ShareCardProps {
  title: string;
  person: number;
  image?: string;
  id: string;
  category: string;
  royalty: string;
  royaltyPrice?: number;
  _id: string;
}
interface ThumbProps {
  image?: string;
}

const Thumb = styled.div<ThumbProps>`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  ${props => {
    if (props.image) {
      return css`
        background: url(${baseURL +
          "/shop/image/" +
          props.image +
          "/thumbnail"});
        background-size: cover;
        background-position: center;
      `;
    }
    return css`
      background: url(${favicon}) no-repeat;
      background-size: 60%;
      background-position: center;
    `;
  }}

  @media (max-width: 640px) {
    width: 100px;
    height: 100px;
  }
`;
const Wrap = styled(Link)`
  all: unset;
  margin: 1.5em;
  cursor: pointer;
  width: 300px;
  position: relative;
  .thumbnail {
    color: white;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 20px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.7)
      );
    }
    .category {
      position: absolute;
      right: 0;
      padding: 10px;
      font-size: 14px;
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
    .information {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 20px;
      h3.title {
        margin: 0;
      }
      h5.royalty {
        margin: 0;
        margin-top: 4px;
        font-weight: normal;
      }
    }
  }
`;

function ShareCard({
  title,
  image,
  _id,
  category,
  royalty,
  royaltyPrice
}: ShareCardProps) {
  const rolaytyText = useMemo(() => {
    switch (royalty) {
      case "monthly":
        return `₩${digitComma(royaltyPrice as number)}/MONTHLY`;
      case "weekly":
        return `₩${digitComma(royaltyPrice as number)}/WEEKLY`;
      default:
        return "별도 문의";
    }
  }, [royalty, royaltyPrice]);

  return (
    <Wrap to={`/product/${_id}`}>
      <Thumb image={image} className="thumbnail">
        <div className="bg" />
        <h3 className="category">{category}</h3>
        <div className="information">
          <h3 className="title">{title}</h3>
          <h5 className="royalty">{rolaytyText}</h5>
        </div>
      </Thumb>
    </Wrap>
  );
}

export default ShareCard;
