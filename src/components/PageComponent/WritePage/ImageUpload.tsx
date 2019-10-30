import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Form/Input";
import { shareAddImage } from "../../../store/forms/Share";
import { RootState } from "../../../store/reducer";
import styled from "styled-components";
import Button from "../../Form/Button";
import WritePageImageUploadPreview from "./imageUploadPreview";

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

function WritePageImageUpload() {
  const { images, previews } = useSelector(
    (state: RootState) => state.Forms.Share
  );
  const dispatch = useDispatch();

  const fileRef = useRef<HTMLInputElement>(null);
  const onAdd = useCallback(() => {
    if (!fileRef.current) return;
    const file = fileRef.current;
    if (!file.files) return;
    dispatch(shareAddImage(Array.from(file.files)));
  }, [dispatch, fileRef]);
  return (
    <div>
      <Flex style={{ flexWrap: "wrap" }}>
        {images.map((data, i) => (
          <WritePageImageUploadPreview
            key={i}
            idx={i}
            image={previews[i]}
            title={data.name}
          />
        ))}
      </Flex>
      <Flex>
        <Input style={{ flex: 1 }} type="file" ref={fileRef} accept="image/*" />
        <div
          style={{
            flex: 0,
            boxSizing: "border-box",
            margin: "0 1em",
            width: "100%"
          }}
        >
          <Button onClick={onAdd}>+추가</Button>
        </div>
      </Flex>
    </div>
  );
}

export default WritePageImageUpload;
