import React from "react";
import ShareCard from "./ShareCard";
import usePrefetch from "../../lib/usePrefetch";
import { getShares } from "../../lib/api/getShares";

//interface SharesProps { }
function Shares() {
  const [product, error] = usePrefetch("Shares", async () => {
    const req = await getShares();
    return req.data.product;
  });
  if (!product) return <div>로드 중...</div>;
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {product.map((data: any, i: any) => (
        <ShareCard
          key={i}
          title={data.title}
          person={data.participant.length}
          id={data._id}
        />
      ))}
    </div>
  );
}

export default Shares;
