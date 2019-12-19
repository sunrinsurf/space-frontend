import React from "react";
import { useSelector } from 'react-redux';

import usePrefetch from "../../lib/usePrefetch";
import { getShares } from "../../lib/api/getShares";
import ErrorComponent from "../ErrorComponent";
import ShareList from "./ShareList";
import { RootState } from "../../store/reducer";

//interface SharesProps { }
function Shares() {
  const token = useSelector((state: RootState) => state.Auth.token);
  const [product, error] = usePrefetch("Shares", async () => {
    const req = await getShares(token);
    return req.data.product;
  });
  if (error) return <ErrorComponent>{error}</ErrorComponent>;
  return <ShareList product={product} />;
}

export default Shares;
