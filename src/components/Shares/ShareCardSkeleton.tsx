import React from 'react'
import styled from 'styled-components';

const Wrap = styled.div`
    margin: 1em 2em;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .thumbnail {
        width: 200px;
        height: 200px;
        border-radius: 20px;
        background: #bababa;
    }
    .title {
        margin-top: 1em;
        height: 36px;
        background: #bababa;
        width: 70%;
        border-radius: 10px;
    }
`;
function ShareCardSkeleton() {
    return (
        <Wrap>
            <div className="thumbnail"></div>
            <div className="title"></div>
        </Wrap>
    )
}

export default ShareCardSkeleton;