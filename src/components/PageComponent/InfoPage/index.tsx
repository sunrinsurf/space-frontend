import React from "react";
import ShareList from "../../Shares/ShareList";

interface InfoPageMainProps {
  nickname: string;
  invitedProducts: any[];
  createdProducts: any[];
}
function InfoPageMain({
  nickname,
  invitedProducts,
  createdProducts
}: InfoPageMainProps) {
  return (
    <div>
      <h1>안녕하세요, {nickname}님.</h1>
      <section>
        <h1>내가 올린 상품</h1>
        <ShareList product={createdProducts} />
      </section>
      <section>
        <h1>내가 참여하고 있는 상품</h1>
        <ShareList product={invitedProducts} />
      </section>
    </div>
  );
}

export default InfoPageMain;
