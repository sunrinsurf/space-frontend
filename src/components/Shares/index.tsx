import React from 'react'
import ShareCard from './ShareCard'

//interface SharesProps { }
function Shares() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ShareCard title="노예 정찬효" person={4} />
            <ShareCard title="X리 부실" person={18} />
        </div>
    )
}

export default Shares;