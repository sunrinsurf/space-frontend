import React from "react";
import usePrefetch from "../../lib/usePrefetch";
import { getShares } from "../../lib/api/getShares";
import ErrorComponent from "../ErrorComponent";
import ShareList from "./ShareList";

//interface SharesProps { }
function Shares() {
  const [product, error] = usePrefetch("Shares", async () => {
    const req = await getShares();
    return req.data.product;
  });
  if (error) return <ErrorComponent>{error}</ErrorComponent>;
  if (!product) return <div>로드 중...</div>;
  return <ShareList product={product} />;
}

export default Shares;
