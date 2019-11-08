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
            title="에어팟2 공유합니다!"
            price="최대 2인"
          />
          <MainShopCard
            title="전동 킥보드 같이 타실 분 구해요!"
            price="최대 1인"
          />
          <MainShopCard
            title="넷플릭스 파티원 모집합니다!"
            price="최대 3인"
          />
          <MainShopCard
            title="교양 도서 50여권 공유하실 분 구해요!"
            price="제한 없음"
          />
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
