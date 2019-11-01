import React from "react";
import "./ProductLayout.css";
import ArticlePage from './ArticlePage'
import InformationPage from './InformationPage'

function ProductLayout() {
    return (
        <div className="ProductLayout__wrap">
            <div className="ProductLayout__Left">
                <div className="ProductLayout__Before">
                    <span role="img" aria-label="rocket" className="MainShareProcedure__arrow" >🚀</span>
                    <div>이전으로</div>
                </div>
                <ArticlePage></ArticlePage>
            </div>
            <div className="ProductLayout__Right">
                <InformationPage></InformationPage>
            </div>
        </div>
    );
}


export default ProductLayout;
