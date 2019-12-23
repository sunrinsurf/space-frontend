import React, { useState } from "react";
import styled, { css } from "styled-components";
import favicon from "../../../assets/favicon.svg";
import "./InformationPage.css";
import { mobile } from "../../../lib/viewport";
import ImageViewModal from "./ImageViewModal";
import { getImageURL } from "../../../lib/api/UploadImage";

const Image = styled.div<{ image?: string }>`
  width: 400px;
  height: 180px;
  border-radius:6pt;
  ${props =>
    props.image
      ? css`
          background: url(${getImageURL(props.image, true)}) no-repeat;
        `
      : css`
          background: url(${favicon}) no-repeat, white;
          background-size: 50%;
          background-position: center;
        `}
  background-size: cover;
  background-position: center;

  ${mobile(css`
    width: 100%;
    height: 250px;
  `)}
`;
const ImageList = styled.div`
  display: flex;
  width:400px;
  margin-top: 16px;
  justify-content: space-between;
  ${mobile(css`
    width:100%;
    margin-top:8px;
  `)}
`;
const ImageBlock = styled.div<{ image?: string }>`
  ${props =>
    props.image
      ? css`
          background: url(${getImageURL(props.image, true)}) no-repeat;
          background-size: cover;
          background-position: center;
        `
      : css`
          background: url(${favicon}) no-repeat, white;
          background-size: 50%;
          background-position: center;
        `}

  width: 120px;
  height: 120px;
  border-radius: 4pt;
  ${mobile(css`
    width: 110px;
    height: 110px;
  `)}

`;
function InformationPage({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  function openModal(image: string) {
    return () => {
      setImage(getImageURL(image));
      setOpen(true);
    };
  }
  const emptys: React.ReactNode[] = [];

  for (let i = images.length === 0 ? 1 : images.length; i < 4; i++) {
    emptys.push(<ImageBlock />);
  }
  return (
    <div className="Information__wrap">
      <ImageViewModal
        open={open}
        onClose={() => setOpen(false)}
        image={image}
      />
      <Image
        image={(images.length as any) && images[0]}
        onClick={images.length ? openModal(images[0]) : undefined}
      />
      <ImageList>
        {images.map((v, i) => {
          if (i === 0) return null;
          return <ImageBlock image={v} onClick={openModal(v)} />;
        })}
        {emptys}
      </ImageList>
    </div>
  );
}

export default InformationPage;
