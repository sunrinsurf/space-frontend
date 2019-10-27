import React from "react";
import "./MainProduct.css";
import MainShopCard from "./MainShopCard";

function MainProduct() {
  return (
    <div className="MainProduct__wrap" id="product">
      <div className="MainProduct__Info">
        <div className="MainProduct__Title">최근 공유된 상품</div>
        <div className="MainProduct__List">
          <MainShopCard
            title="파이어 페스티벌"
            body="불타오르네"
            price="월 4억"
          />
          <MainShopCard
            title="파이어 페스티벌"
            body="불타오르네"
            price="월 4억"
          />
          <MainShopCard
            title="파이어 페스티벌"
            body="불타오르네"
            price="월 4억"
          />
          <MainShopCard
            title="파이어 페스티벌"
            body="불타오르네"
            price="월 4억"
          />
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
