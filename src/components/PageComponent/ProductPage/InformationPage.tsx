import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./InformationPage.css";
import Button from "../../Form/Button";
import { RootState } from "../../../store/reducer";
import { InviteChat } from "../../../store/Chat";
import moment from 'moment';

interface InformationPageProps {
  timeToUse: "selectTime" | "noLimit" | "afterContact";
  timeToUseDate: Date | null;
  royalty: "weekly" | "monthly" | "afterContact";
  royaltyPrice: string | null;
  person: number;
  participant: any[];
  owner: any;
  productId: string;
}
function InformationPage({
  royalty,
  royaltyPrice,
  timeToUse,
  timeToUseDate,
  person,
  participant,
  owner,
  productId
}: InformationPageProps) {
  const { _id } = useSelector((state: RootState) => state.Auth.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const royaltyText = useMemo(() => {
    if (royalty === "afterContact") {
      return "로열티 협의";
    }

    function priceSet(i: any) {
      const s = i.toString();
    }
    if (royalty === "monthly") return `월 ${royaltyPrice}원`;
    if (royalty === "weekly") return `주 ${royaltyPrice}원`;
  }, [royalty, royaltyPrice]);
  const timeToUseText = useMemo(() => {
    if (timeToUse === "afterContact") {
      return "사용 날짜 협의";
    }
    if (timeToUse === "noLimit") {
      return "사용 날짜 제한 없음";
    }
    if (timeToUse === "selectTime") {
      return `${moment(timeToUseDate as Date).format("YYYY년 MM월 DD일")}까지`;
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
    <div className="Information__wrap">
      <div className="Information__Title">공유정보</div>
      <div className="Information__Text">
        <div>{royaltyText}</div>
        <div>{person}인 사용 가능</div>
        <div>{timeToUseText}</div>
      </div>
      <div>
        <div className="Information__Personnel">
          {participantText}/{person}명 참여중
        </div>
        <Button fullWidth onClick={onClick}>
          {JoinText}
        </Button>
      </div>
    </div>
  );
}

export default InformationPage;
