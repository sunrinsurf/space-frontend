import React from "react";
import "./MainShareProcedure.css";
import Arrow from "../../Design/Arrow"

function MainShareProcedure() {
    return (
        <div className="MainShareProcedure__wrap">
            <div className="MainShareProcedure__Info">
                <div className="MainShareProcedure__Title">공유 절차 소개</div>

                <div className="MainShareProcedure__Image">
                    <Step start />
                    <Step />
                    <Step />
                </div>

            </div>
        </div>
    );

}

function Step({ start }: { start?: boolean }) {
    return (
        <div className="MainShareProcedure__Images_Element">
            {!start && <Arrow strokeLen={10} className="MainShareProcedure__arrow"></Arrow>}
            <div className="MainShareProcedure__Images radius"></div>
        </div>
    )
}

export default MainShareProcedure;
