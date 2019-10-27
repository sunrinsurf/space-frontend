import React from "react";
import { useHistory } from 'react-router-dom'
import Button from "../../Form/Button";
import "./MainInfo.css";
import Favicon from "../../Layout/Favicon";

function MainInfo() {
  const history = useHistory();
  function getStart() {
    history.push('/signup');
  }


  return (
    <div className="MainInfo__wrap">
      <div className="MainInfo__Info">
        <div className="MainInfo__Favicon">
          <Favicon />
        </div>
        <div className="MainInfo__Catchphrase">소유의 경계를 허물다, 스페이스</div>
        <div className="MainInfo__Subject">누구나, 무엇이든 공유하는 공유경제 마켓</div>
        <div className="MainInfo__Button">
          <Button onClick={getStart} fullWidth>시작하기</Button>
        </div>
      </div>
    </div >
  );

}

export default MainInfo;
