import React from "react";
import getClassHandler from "../../lib/getClassHandler";
import ShareCard from "./ShareCard";
import "./index.css";
import ShareCardSkeleton from "./ShareCardSkeleton";

const cls = getClassHandler("Shares");

interface ShareListProps {
  product?: any[];
}
function ShareList({ product }: ShareListProps) {
  return (
    <div className={cls("list")}>
      {product ? product.map((data: any, i: any) => (
        <ShareCard
          key={i}
          title={data.title}
          person={data.participant.length}
          image={data.images && data.images[0]}
          id={data._id}
        />
      )) :
        new Array(8).fill(<ShareCardSkeleton />)
      }
    </div>
  );
}

export default ShareList;
