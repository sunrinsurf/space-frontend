import React from "react";
import ShareCard from "./ShareCard";

interface ShareListProps {
  product?: any[];
}
function ShareList({ product }: ShareListProps) {
  return (
    <>
      {product ? product.map((data: any, i: any) => (
        <ShareCard
          key={i}
          title={data.title}
          person={data.participant.length}
          image={data.images && data.images[0]}
          id={data._id}
        />
      )) :
        null
      }
    </>
  );
}

export default ShareList;
