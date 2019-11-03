import React, { useEffect } from "react";
import "./ProductLayout.css";
import ArticlePage from "./ArticlePage";
import { useDispatch, useSelector } from "react-redux";
import InformationPage from "./InformationPage";
import usePrefetch from "../../../lib/usePrefetch";
import { getShare } from "../../../lib/api/getShares";
import ErrorComponent from "../../ErrorComponent";
import { RootState } from "../../../store/reducer";
import { CleanChat } from "../../../store/Chat";

interface ProductLayoutProps {
  id: string;
}
function ProductLayout({ id }: ProductLayoutProps) {
  const { invited } = useSelector((state: RootState) => state.Chat);
  const dispatch = useDispatch();
  const [data, error] = usePrefetch("Product", async () => {
    return await getShare(id);
  });
  const [clientData, setClientData] = React.useState<any>();

  useEffect(() => {
    return () => {
      dispatch(CleanChat());
    };
  }, [dispatch]);
  useEffect(() => {
    if (!invited) return;
    getShare(id).then(d => {
      setClientData(d);
    });
  }, [invited, id]);
  if (error) return <ErrorComponent>{error}</ErrorComponent>;
  if (!data) return null;

  const {
    category,
    owner,
    title,
    contents,
    timeToUse,
    timeToUseDate,
    royalty,
    royaltyPrice,
    participant,
    person
  } = clientData || data;
  return (
    <div className="ProductLayout__wrap">
      <div className="ProductLayout__Left">
        <div className="ProductLayout__Before">
          <div>이전으로</div>
        </div>
        <ArticlePage
          category={category}
          by={owner.nickname}
          title={title}
          contents={contents}
        />
      </div>
      <div className="ProductLayout__Right">
        <InformationPage
          timeToUse={timeToUse}
          timeToUseDate={timeToUseDate}
          royalty={royalty}
          royaltyPrice={royaltyPrice}
          person={person}
          participant={participant}
          owner={owner}
          productId={id}
        />
      </div>
    </div>
  );
}

export default ProductLayout;
