import React from "react";
import styled, { css } from 'styled-components';
import favicon from '../../../assets/favicon.svg';
import "./InformationPage.css";
import { mobile } from "../../../lib/viewport";
import { baseURL } from "../../../lib/api/client";

const Image = styled.div<{ image?: string }>`
  width: 400px;
  height: 200px;
  ${props => props.image ? css`
    background: url(${baseURL + '/shop/image/' + props.image + '/thumbnail'}) no-repeat;
  ` : css`
      background: url(${favicon}) no-repeat, white;
      background-size: 50%;
      background-position: center;
    `}
    background-size: cover;
    background-position: center;

    ${mobile(css`
      width: 250px;
      height: 250px;
    `)}
`;
const ImageList = styled.div`
  display: flex;
  margin-top: 20px;
  width: 400px;
  justify-content: space-between;
`;
const ImageBlock = styled.div<{ image?: string }>`
  ${props => props.image ? css`
    background: url(${baseURL + '/shop/image/' + props.image + '/thumbnail'}) no-repeat;
    background-size: cover;
    background-position: center;
  ` : css`
    background: url(${favicon}) no-repeat, white;
    background-size: 50%;
    background-position: center;
  `}

  width: 120px;
  height: 120px;
  border-radius: 4pt;
`;
function InformationPage({ images }: { images: string[] }) {
  const emptys: React.ReactNode[] = [];

  for (let i = images.length; i < 4; i++) {
    emptys.push(
      <ImageBlock />
    )
  }
  return (
    <div className="Information__wrap">
      <Image image={images.length as any && images[0]} />
      <ImageList>
        {images.map((v, i) => {
          if (i === 0) return null;
          return (
            <ImageBlock image={v} />
          )
        })}
        {emptys}
      </ImageList>
    </div>
  );
}

export default InformationPage;
