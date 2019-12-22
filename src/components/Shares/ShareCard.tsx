import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import favicon from "../../assets/favicon.svg";
import digitComma from "../../lib/digitComma";
import { getImageURL } from "../../lib/api/UploadImage";

interface ShareCardProps {
  title: string;
  person: number;
  image?: string;
  id: string;
  category: string;
  royalty: string;
  royaltyPrice?: number;
  _id: string;
  participant: any[];
  notLogined?: boolean;
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
        background: url(${getImageURL(props.image, true)});
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
      text-shadow: 0 0 3px black;
    }
    .person {
      position: absolute;
      left: 0;
      padding: 10px;
      font-size: 14px;
      text-shadow: 0 0 3px black;
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
        color: #CACACA;
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
  royaltyPrice,
  person,
  participant,
  notLogined
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
  const ProductText = useMemo(() => {
    const limit = 13;
    if (title.length > limit) {
      return title.slice(0, limit) + "...";
    }
    return title;
  }, [title]);

  return (
    <Wrap to={`/product/${_id}`} onClick={(e) => notLogined && e.preventDefault()}>
      <Thumb image={image} className="thumbnail">
        <div className="bg" />
        <h3 className="person">
          {participant.length}/{person} 참여
        </h3>
        <h3 className="category">{category}</h3>
        <div className="information">
          <h3 className="title">{ProductText}</h3>
          <h5 className="royalty">{rolaytyText}</h5>
        </div>
      </Thumb>
    </Wrap>
  );
}

export default ShareCard;
