import React from 'react'
import ShareCardSkeleton from './ShareCardSkeleton'

function ShareListSkeleton() {
    return (
        <>
            {new Array(10).fill(null).map((_, i) => <ShareCardSkeleton key={i} />)}
        </>
    )
}

export default ShareListSkeleton;