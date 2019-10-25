import React from "react";
import "./MainShopCard.css";

function MainShopCard() {
    return (
        <div className="MainShopCard__wrap">
            <div className="MainShopCard__Image radius"></div>
            <div className="MainShopCard__Content">
                <div style={{ fontSize: '24px' }}>파이어 페스티벌</div>
                <div style={{ fontSize: '20px' }}>월 1코인</div>
                <div>3억~4억 희망</div>
                {/* props 부탁한다 */}
            </div>
        </div>
    );

}

export default MainShopCard;
