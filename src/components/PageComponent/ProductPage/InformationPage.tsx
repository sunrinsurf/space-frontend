import React from "react";
import styled, { css } from 'styled-components';
import favicon from '../../../assets/favicon.svg';
import "./InformationPage.css";
import { mobile } from "../../../lib/viewport";
import { baseURL } from "../../../lib/api/client";

const Image = styled.div<{ image?: string }>`
  width: 400px;
  height: 400px;
  ${props => props.image ? css`
    background: url(${baseURL + '/shop/image/' + props.image}) no-repeat;
  ` : css`
      background: url(${favicon}) no-repeat;
    `}
    background-size: contain;
    background-position: center;

    ${mobile(css`
      width: 250px;
      height: 250px;
    `)}
`;
function InformationPage({ image }: any) {
  return (
    <div className="Information__wrap">
      <Image image={image} />
    </div>
  );
}

export default InformationPage;
