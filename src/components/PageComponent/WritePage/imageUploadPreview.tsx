import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { shareRemoveImage } from "../../../store/forms/Share";

interface ImageProps {
  url: string;
}
const Image = styled.div<ImageProps>`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  position: relative;
  ${props => css`
    background: url(${props.url});
    background-size: cover;
    background-position: center;
  `}
  .delete {
    cursor: pointer;
    font-size: 20px;
    color: white;
    text-shadow: 0 0 3px black;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 10px;
  }
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
      <Image url={image} role="image" aria-label={title + " Preview"}>
        <span className="delete" role="button" onClick={onRemove}>
          &times;
        </span>
      </Image>
    </div>
  );
}

export default WritePageImageUploadPreview;
