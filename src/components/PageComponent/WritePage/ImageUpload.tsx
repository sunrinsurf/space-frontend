import React, { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareAddImage } from "../../../store/forms/Share";
import { RootState } from "../../../store/reducer";
import styled from "styled-components";
import favicon from '../../../assets/favicon.svg';
import WritePageImageUploadPreview from "./imageUploadPreview";

const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const UploadImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(34, 34, 34, 0.15);
  margin: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  cursor: pointer;

  .image {
    width: 60px;
    height: 42px;
    background: url(${favicon}) no-repeat;
    background-size: contain;
    background-position: center;
    opacity: 0.3;
    margin-bottom: 8px;
  }
`;

function WritePageImageUpload() {
  const { images, previews } = useSelector(
    (state: RootState) => state.Forms.Share
  );
  const dispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement>(null);
  const onAdd = useCallback(() => {
    if (!fileRef.current) return;
    fileRef.current.click();
  }, [fileRef]);

  useEffect(() => {
    if (!fileRef.current) return;

    function onchange(e: any) {
      const { files } = e.target;
      if (!files) return;
      dispatch(shareAddImage(Array.from(files)));
    }
    fileRef.current.addEventListener('change', onchange);
  }, [dispatch, fileRef]);
  return (
    <div style={{ overflowX: 'auto' }}>
      <Flex style={{ flexWrap: "wrap" }}>
        {images.map((data, i) => (
          <WritePageImageUploadPreview
            key={i}
            idx={i}
            image={previews[i]}
            title={data.name}
          />
        ))}
        <UploadImage onClick={onAdd}>
          <div className="image" role="img" aria-label="Space Favicon" />
          사진 추가
        </UploadImage>

      </Flex>
      <input style={{ display: 'none' }} type="file" ref={fileRef} accept="image/*" />
    </div>
  );
}

export default WritePageImageUpload;
