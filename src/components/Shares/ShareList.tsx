import React from "react";
import ShareCard from "./ShareCard";

interface ShareListProps {
  product?: any[];
  notLogined?: boolean
}
function ShareList({ product, notLogined }: ShareListProps) {
  return (
    <>
      {product
        ? product.map((data: any, i: any) => (
          <ShareCard
            key={i}
            image={data.images && data.images[0]}
            notLogined={notLogined}
            {...data}
          />
        ))
        : null}
    </>
  );
}

export default ShareList;
