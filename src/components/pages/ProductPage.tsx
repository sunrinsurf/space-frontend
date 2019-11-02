import React from "react";
import Page from "../Page";
import ProductLayout from "../PageComponent/ProductPage/ProductLayout";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface PathParamType {
  id: string;
}

type ProductPageType = RouteComponentProps<PathParamType>;
function ProductPage({
  match: {
    params: { id }
  }
}: ProductPageType) {
  return (
    <Page>
      <ProductLayout id={id} />
    </Page>
  );
}

export default withRouter(ProductPage);
