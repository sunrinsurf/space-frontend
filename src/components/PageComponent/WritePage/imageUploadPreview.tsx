import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { shareRemoveImage } from "../../../store/forms/Share";

interface ImageProps {
  url: string;
}
const Image = styled.div<ImageProps>`
  width: 200px;
  height: 200px;
  ${props => css`
    background: url(${props.url});
    background-size: cover;
    background-position: center;
  `}
`;

interface ImageUploadPreviewProps {
  image: string;
  title: string;
  idx: number;
}
function WritePageImageUploadPreview({
  image,
  title,
  idx
}: ImageUploadPreviewProps) {
  const dispatch = useDispatch();

  const onRemove = useCallback(() => {
    dispatch(shareRemoveImage(idx));
  }, [dispatch, idx]);
  return (
    <div style={{ margin: "1em" }}>
      <div style={{ textAlign: "right" }}>
        <span role="button" style={{ cursor: "pointer" }} onClick={onRemove}>
          &times;
        </span>
      </div>
      <Image url={image} role="image" aria-label={title + " Preview"} />
      <h3>{title}</h3>
    </div>
  );
}

export default WritePageImageUploadPreview;
