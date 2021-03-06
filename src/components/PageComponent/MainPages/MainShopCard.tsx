import React from "react";
import "./MainShopCard.css";

function MainShopCard({ title, price }: { title: string, price: string, }) {
    return (
        <div className="MainShopCard__wrap">
            <div className="MainShopCard__Image radius"></div>
            <div className="MainShopCard__Content">
                <div style={{ fontSize: '24px', wordBreak: 'keep-all' }}>{title}</div>
                <div style={{ fontSize: '20px' }}>{price}</div>
            </div>
        </div>
    );

}

export default MainShopCard;
