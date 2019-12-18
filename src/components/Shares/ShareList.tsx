import React from "react";
import getClassHandler from "../../lib/getClassHandler";
import ShareCard from "./ShareCard";
import "./index.css";

const cls = getClassHandler("Shares");

interface ShareListProps {
  product?: any[];
}
function ShareList({ product }: ShareListProps) {
  if (!product) return null;
  return (
    <div className={cls("list")}>
      {product.map((data: any, i: any) => (
        <ShareCard
          key={i}
          title={data.title}
          person={data.participant.length}
          image={data.images && data.images[0]}
          id={data._id}
        />
      ))}
    </div>
  );
}

export default ShareList;
