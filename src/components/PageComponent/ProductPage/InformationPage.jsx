import React from "react";
import "./InformationPage.css";
import Button from "../../Form/Button";


function InformationPage() {
    return (
        <div className="Information__wrap">
            <div className="Information__Title">공유정보</div>
            <div className="Information__Text">
                <div>월 로열티 35,000원</div>
                <div>월, 수, 금 사용 가능</div>
                <div>3~4인 사용 가능</div>
                <div>~ 2020/1/31</div>
            </div>
            <div>
                <div className="Information__Personnel">2/4명 참여중</div>
                <Button fullWidth></Button>
            </div>
        </div>
    );
}


export default InformationPage;
