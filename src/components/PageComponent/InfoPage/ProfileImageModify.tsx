import React, { useCallback, useRef, useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import UploadImage, { getImageURL } from '../../../lib/api/UploadImage';
import profile from '../../../assets/profile.svg';
import camera from '../../../assets/icons/camera.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { modifyProfileImage } from '../../../lib/api/modify';

const Image = styled.div<{ image?: string }>`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  ${props => props.image ? css`
    background: url(${getImageURL(props.image)}) no-repeat;
  ` : css`
    background: url(${profile}) no-repeat;
  `}
  background-size: cover;
  background-position: center;
  position: relative;

  .camera {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #328fff;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: url(${camera}) no-repeat, #328fff;
      background-size: 50%;
      background-position: center;
  }
  .file {
      display: none;
  }
`;

interface ProfileImageModifyProps {
    nickname: string;
    image?: string
}
function ProfileImageModify({ image, nickname }: ProfileImageModifyProps) {
    const file = useRef<HTMLInputElement>();
    const [img, setImg] = useState(image);
    const token = useSelector((state: RootState) => state.Auth.token);
    const selectImage = useCallback(() => {
        if (!file.current) return;
        file.current.click();
    }, [file]);

    useEffect(() => {
        if (!file.current) return;
        if (!token) return;

        function onchange(e: React.ChangeEvent<HTMLInputElement>) {
            if (!e.target.files) return;
            if (!token) return;
            const files = [e.target.files[0]];
            let id: string;
            UploadImage({ files, token })
                .then((data: any) => {
                    id = data.data[0];
                    return modifyProfileImage(id, token)
                })
                .then(() => setImg(id))
                .catch(e => {
                    alert(e.message);
                });
        }

        file.current.addEventListener('change', onchange as any);
    }, [file, token]);
    return (
        <Image onClick={selectImage} role="img" aria-label={`${nickname} profile`} image={img}>
            <div className="camera" />
            <input type="file" className="file" ref={file as any} accept="image/*" />
        </Image>
    )
}

export default ProfileImageModify;