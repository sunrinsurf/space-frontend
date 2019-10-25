import React from "react";
import "./MainProduct.css";
import MainShopCard from "./MainShopCard";

function MainProduct() {
    return (
        <div className="MainProduct__wrap">
            <div className="MainProduct__Info">
                <div className="MainProduct__Title">최근 공유된 상품</div>
                <div className="MainProduct__List">
                    <MainShopCard />
                    <MainShopCard />
                    <MainShopCard />
                    <MainShopCard />
                </div>
            </div>
        </div >
    );

}

export default MainProduct;
