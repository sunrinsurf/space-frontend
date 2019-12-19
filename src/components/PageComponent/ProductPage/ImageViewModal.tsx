import React from 'react'
import styled from 'styled-components';

const Wrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
    .contents {
        position: relative;
    }
    .image {
        max-height: 70vh;
        max-width: 70vw;
    }
    .close {
        font-size: 30px;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        padding: 10px;
        text-shadow: 0 0 10px white;
    }
`;

interface ImageViewModalProps {
    open: boolean;
    onClose(): any;
    image: string;
}
function ImageViewModal({ open, onClose, image }: ImageViewModalProps) {
    if (!open) return null;
    return (
        <Wrap onClick={onClose}>
            <div className="contents" onClick={e => { e.stopPropagation() }}>
                <div className="close" role="button" onClick={onClose}>&times;</div>
                <img src={image} alt="Product" className="image" />
            </div>
        </Wrap>
    )
}

export default ImageViewModal;