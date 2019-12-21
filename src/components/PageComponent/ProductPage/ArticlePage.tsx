import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled, { css } from 'styled-components';
import "./ArticlePage.css";
import Button from "../../Form/Button";
import { RootState } from "../../../store/reducer";
import { InviteChat } from "../../../store/Chat";
import favicon from '../../../assets/favicon.svg';
import moment from 'moment';
import { getImageURL } from "../../../lib/api/UploadImage";
interface ArticlePageProps {
  category: string;
  title: string;
  by: string;
  contents: string;
  timeToUse: "selectTime" | "noLimit" | "afterContact";
  timeToUseDate: Date | null;
  royalty: "weekly" | "monthly" | "afterContact";
  royaltyPrice: string | null;
  person: number;
  participant: any[];
  owner: any;
  productId: string;
  profileImage?: string;
}

const ProfileImage = styled.div<{ image?: string }>`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  ${props => props.image ? css`
    background: url(${getImageURL(props.image, true)}) no-repeat;
    background-size: cover;
    border-radius: 25px;
  ` : css`
    background: url(${favicon}) no-repeat;
    background-size: contain;
  `}
  background-position: center;
`;
function ArticlePage({ category, title, by, contents, royalty,
  royaltyPrice,
  timeToUse,
  timeToUseDate,
  person,
  participant,
  owner,
  productId,
  profileImage }: ArticlePageProps) {

  const { _id } = useSelector((state: RootState) => state.Auth.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const royaltyText = useMemo(() => {
    if (royalty === "afterContact") {
      return "로열티 협의";
    }

    function priceSet(i: any) {
      return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (royalty === "monthly") return `월 ${priceSet(royaltyPrice)}원`;
    if (royalty === "weekly") return `주 ${priceSet(royaltyPrice)}원`;
  }, [royalty, royaltyPrice]);
  const timeToUseText = useMemo(() => {
    if (timeToUse === "afterContact") {
      return "사용 날짜 협의";
    }
    if (timeToUse === "noLimit") {
      return "사용 날짜 제한 없음";
    }
    if (timeToUse === "selectTime") {
      return `~ ${moment(timeToUseDate as Date).format("YYYY년 MM월 DD일")}`;
    }
  }, [timeToUse, timeToUseDate]);
  const [isJoined, JoinText] = useMemo(() => {
    if (_id === owner._id) return [true, "계속하기"];
    for (const p of participant) {
      if (p === _id) return [true, "계속하기"];
    }
    return [false, "참여하기"];
  }, [_id, participant, owner]);
  const participantText = useMemo(() => participant.length, [participant]);

  const onClick = React.useCallback(() => {
    if (!isJoined) {
      dispatch(InviteChat(productId));
    } else {
      history.push(`/chat/${productId}`);
    }
  }, [dispatch, isJoined, productId, history]);

  return (
    <div className="ArticlePage__wrap">
      <div className="ArticlePage__Category"><span style={{ color: "black" }}>{category}</span> | <span style={{ color: "#ff388a" }}>{participantText}/{person} 참여중</span> | <span style={{ color: "#ff388a" }}>{timeToUseText}</span></div>
      <h1 className="ArticlePage__title">{title}</h1>
      <div className="ArticlePage__Nickname">
        <ProfileImage image={profileImage} />
        <div style={{ fontWeight: "bold" }}>{by}</div>
      </div>
      <div className="ArticlePage__Text">{contents}</div>
      <div className="ArticlePage__Box">
        <div>{royaltyText}</div>
        <div>{person}인 사용 가능</div>
      </div>
      <Button radius="10px" background="#1183fa" onClick={onClick} style={{ marginTop: "20px", paddingLeft: 50, paddingRight: 50 }}>{JoinText}</Button>
    </div>
  );
}

export default ArticlePage;
