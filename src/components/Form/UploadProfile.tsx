import React, { useRef, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import { ReactComponent as Camera } from '../../assets/icons/camera.svg';
import UploadImage, { getImageURL } from '../../lib/api/UploadImage';
import handleError from '../../lib/api/handleError';
import { useDispatch } from 'react-redux';
import { setProfileImage } from '../../store/SignUp';

const UploadButton = styled.button<{ image?: string }>`
    all: unset;
    width: 110px;
    height: 110px;
    border-radius: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    ${props => props.image ? css`
        background: url(${getImageURL(props.image, true)}) no-repeat;
        background-size: cover;
        background-position: center;
    ` : "background: #328fff;"}
    .uploading {
        position: absolute;
        background: rgba(0,0,0,0.5);
        padding: 5px;
        bottom: 0;
    }
`;
function UploadProfile() {
    const file = useRef<HTMLInputElement>();
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!file.current) return;
        if (!dispatch) return;

        function onchange(e: any) {
            const { files }: { files: FileList } = e.target;
            if (!files.length) return;

            const data = [files[0]];
            setUploading(true);
            handleError(() => UploadImage({ files: data }))
                .then(data => {
                    setImage(data.data[0]);
                    dispatch(setProfileImage(data.data[0]));
                    setUploading(false);
                })
                .catch(e => {
                    alert(e.message);
                });
        }

        file.current.addEventListener('change', onchange);
    }, [file, dispatch]);
    const onclick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (!file.current) return;
        file.current.click();
    }, [file])
    return (
        <div>
            <UploadButton image={image} onClick={onclick}>
                {!image && <Camera />}
                {uploading && <div className="uploading">업로드 중...</div>}
            </UploadButton>
            <input accept="image/*" type="file" className="input" ref={file as any} style={{ display: 'none' }} />
        </div>
    )
}

export default UploadProfile;