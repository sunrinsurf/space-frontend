import React from "react";
import "./ArticlePage.css";


function ArticlePage() {
    return (
        <div className="AticlePage__warp">
            <div className="ArticlePage__Category">작업공간/장소 공유</div>
            <div className="ArticlePage__title">강남 메이커 스페이스 공유하실 분 구합니다.</div>
            <div className="ArticlePage__User">
                <span role="img" aria-label="rocket" className="MainShareProcedure__arrow" >🚀</span>
                <div className="ArticlePage__Nickname">찬효는머머리</div>
            </div>
            <div className="ArticlePage__Text">안녕하세요? 저는 머머리에요 그래서 가발을 공유하려고하는데요 색깔은 상관없지만 핑크색이면 좋을거같네요. 그리고 저는 인생이 힘들어요 그래서 제 인생을 대신 살아주실분을 구하고 그리고 저는 곧 수능을 볼 예정인데 제 수능 시험을 공유할분을 구합니다.. 관심이 있다면 채팅으로 문의 주세요</div>
            <div className="ArticlePage__Image">
                {/* 사진 넣는곳 */}
                <div className="ArticlePage__Images"></div>
                <div className="ArticlePage__Images"></div>
                <div className="ArticlePage__Images"></div>
                <div className="ArticlePage__Images"></div>
                <div className="ArticlePage__Images"></div>
            </div>
        </div>
    )
}


export default ArticlePage;
