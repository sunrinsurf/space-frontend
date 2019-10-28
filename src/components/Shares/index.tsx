import React from 'react'
import ShareCard from './ShareCard'

//interface SharesProps { }
function Shares() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ShareCard title="Netflix 이용권" person={4} image="https://shawetcanada.files.wordpress.com/2019/02/netflix.png" />
            <ShareCard title="PS4 콜 오브 듀티: 모던 워페어" person={18} image="http://img.danawa.com/prod_img/500000/126/609/img/9609126_1.jpg?shrink=500:500&_v=20191002142748" />
        </div>
    )
}

export default Shares;