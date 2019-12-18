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
      background: url(${favicon}) no-repeat;
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
  ` : css`
    background: url(${favicon}) no-repeat, white;
    background-size: 50%;
    background-position: center;
  `}

  width: 120px;
  height: 120px;
  border-radius: 4pt;
`;
function InformationPage({ image }: any) {
  return (
    <div className="Information__wrap">
      <Image image={image} />
      <ImageList>
        <ImageBlock />
        <ImageBlock />
        <ImageBlock />

      </ImageList>
    </div>
  );
}

export default InformationPage;
