import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { getShares } from "../../lib/api/getShares";
import ErrorComponent from "../ErrorComponent";
import ShareList from "./ShareList";
import { RootState } from "../../store/reducer";
import { mobile } from "../../lib/viewport";
import ShareListSkeleton from "./ShareListSkeleton";

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1em;
  justify-content: center;

  ${mobile(css`
    flex-direction: column;
    flex-wrap: initial;
    justify-content: initial;
  `)}
`;
//interface SharesProps { }
function Shares() {
  const token = useSelector((state: RootState) => state.Auth.token);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [end, setEnd] = useState(false);

  const fetch = useCallback(async () => {
    setPending(true);
    const req = await getShares(token, page);
    setPending(false);
    if (req.data.product.length < 1) {
      setEnd(true);
      return;
    }
    setProduct((p: any) => p ? [...p, ...req.data.product] : req.data.product);

  }, [token, page]);
  const increasePage = useCallback(() => {
    if (pending || end) return;
    setPage(page + 1);
  }, [page, pending, end]);
  useEffect(() => {
    const handler: any = () => {
      const y = window.scrollY + window.innerHeight;
      const height = window.document.body.scrollHeight - 100;

      if (y >= height) {
        if (!product) return;
        increasePage();
      }
    }
    window && window.addEventListener('scroll', handler);

    return () => {
      window && window.removeEventListener('scroll', handler);
    }
  }, [increasePage, product]);
  useEffect(() => {
    fetch().catch(e => {
      console.log(e);
      if (!e.response || e.response.status !== 404) setError(e.message);
    });
  }, [fetch, page]);

  if (error) return <ErrorComponent>{error}</ErrorComponent>;
  return (
    <List>
      <ShareList product={product} />
      {
        pending && <ShareListSkeleton />
      }
    </List>
  );
}

export default Shares;
