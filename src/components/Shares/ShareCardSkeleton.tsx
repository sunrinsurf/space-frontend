import React from 'react'
import styled from 'styled-components';

const Wrap = styled.div`
    margin: 1em 2em;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .thumbnail {
        width:  300px;
        height: 300px;
        border-radius: 20px;
        background: #bababa;
    }
`;
function ShareCardSkeleton() {
    return (
        <Wrap>
            <div className="thumbnail"></div>
        </Wrap>
    )
}

export default ShareCardSkeleton;