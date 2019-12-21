import React from "react";
import ShareCard from "./ShareCard";

interface ShareListProps {
  product?: any[];
}
function ShareList({ product }: ShareListProps) {
  return (
    <>
      {product
        ? product.map((data: any, i: any) => (
            <ShareCard
              key={i}
              person={data.participant.length}
              image={data.images && data.images[0]}
              {...data}
            />
          ))
        : null}
    </>
  );
}

export default ShareList;
