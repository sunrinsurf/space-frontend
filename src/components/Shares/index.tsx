import React from "react";
import ShareCard from "./ShareCard";
import usePrefetch from "../../lib/usePrefetch";
import { getShares } from "../../lib/api/getShares";
import ErrorComponent from "../ErrorComponent";

import './index.css';
import getClassHandler from "../../lib/getClassHandler";

const cls = getClassHandler("Shares");

//interface SharesProps { }
function Shares() {
  const [product, error] = usePrefetch("Shares", async () => {
    const req = await getShares();
    return req.data.product;
  });
  if (error) return <ErrorComponent>{error}</ErrorComponent>;
  if (!product) return <div>로드 중...</div>;
  return (
    <div className={cls("list")}>
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
