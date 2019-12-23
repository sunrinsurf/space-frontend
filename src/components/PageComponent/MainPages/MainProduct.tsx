import React from "react";
import "./MainProduct.css";
import styled from "styled-components";
import ShareList from "../../Shares/ShareList";
import usePrefetch from "../../../lib/usePrefetch";
import { getMainShare } from "../../../lib/api/getShares";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  

  h3, h5 {
    font-size: 20px;
  }
`;
function MainProduct() {

  const [data] = usePrefetch('Main__Recently', async () => {
    const data = await getMainShare();
    return data.data;
  })
  console.log(data);
  return (
    <div className="MainProduct__wrap" id="product">
      <div className="MainProduct__Info">
        <div className="MainProduct__Title">최근 공유된 상품</div>
        <Flex>
          <ShareList notLogined product={data && data.product ? data.product : undefined} />
        </Flex>
      </div>
    </div>
  );
}

export default MainProduct;
