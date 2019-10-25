import React from "react";
import Button from "../../Form/Button";
import "./MainInfo.css";

function MainInfo() {
  return (
    <div className="MainInfo__wrap">
      <div className="MainInfo__Info">
        <span role="img" aria-label="rocket">🚀</span>
        <div className="MainInfo__Catchphrase">소유의 경계를 허물다, 스페이스</div>
        <div className="MainInfo__Subject">누구나, 무엇이든 공유하는 공유경제 마켓</div>
        <div className="MainInfo__Button">
          <Button fullWidth>시작하기</Button>
        </div>
      </div>
    </div >
  );

}

export default MainInfo;
