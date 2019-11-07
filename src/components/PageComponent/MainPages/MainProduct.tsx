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
            body="별도 문의"
            price="최대 2인"
          />
          <MainShopCard
            title="전동 킥보드 같이 타실 분 구해요!"
            body="날짜/시간대 협의 가능"
            price="최대 1인"
          />
          <MainShopCard
            title="넷플릭스 파티원 모집합니다!"
            body="날짜/시간대 제안 없음"
            price="최대 3인"
          />
          <MainShopCard
            title="날짜/시간대 협의 후 결정"
            body="별도 문의"
            price="제한 없음"
          />
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
