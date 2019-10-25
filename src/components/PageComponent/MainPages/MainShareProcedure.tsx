import React from "react";
import "./MainShareProcedure.css";

function MainShareProcedure() {
    return (
        <div className="MainShareProcedure__wrap">
            <div className="MainShareProcedure__Info">
                <div className="MainShareProcedure__Title">공유 절차 소개</div>

                <div className="MainShareProcedure__Image">
                    {/* <img src="" width="200px" height="200px"/> */}
                    <div className="MainShareProcedure__Images radius"></div>
                    <span role="img" aria-label="rocket" className="MainShareProcedure__arrow" >🚀</span>
                    <div className="MainShareProcedure__Images radius"></div>
                    <span role="img" aria-label="rocket" className="MainShareProcedure__arrow">🚀</span>
                    <div className="MainShareProcedure__Images radius"></div>
                </div>

            </div>
        </div>
    );

}

export default MainShareProcedure;
