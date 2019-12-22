import React, { useState, useEffect } from 'react'
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
        max-height: 90vh;
        max-width: 90vw;
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
    .loading {
        width: 500px;
        height: 500px;
        background: #bababa;
    }
`;

interface ImageViewModalProps {
    open: boolean;
    onClose(): any;
    image: string;
}
function ImageViewModal({ open, onClose, image }: ImageViewModalProps) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(open);
    }, [open]);

    if (!open) return null;

    return (
        <Wrap onClick={onClose}>
            <div className="contents" onClick={e => { e.stopPropagation() }}>
                <div className="close" role="button" onClick={onClose}>&times;</div>
                {loading && <div className="loading" />}
                <img src={image} alt="Product" className="image" onLoad={() => setLoading(false)} />
            </div>
        </Wrap>
    )
}

export default ImageViewModal;