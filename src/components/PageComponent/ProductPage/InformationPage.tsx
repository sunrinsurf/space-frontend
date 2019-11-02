import React, { useMemo } from "react";
import "./InformationPage.css";
import Button from "../../Form/Button";

interface InformationPageProps {
  timeToUse: "selectTime" | "noLimit" | "afterContact";
  timeToUseDate: Date | null;
  royalty: "weekly" | "monthly" | "afterContact";
  royaltyPrice: string | null;
  person: number;
  participant: any[];
}
function InformationPage({
  royalty,
  royaltyPrice,
  timeToUse,
  timeToUseDate,
  person,
  participant
}: InformationPageProps) {
  const royaltyText = useMemo(() => {
    if (royalty === "afterContact") {
      return "로열티 협의";
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
      return `${(timeToUseDate as Date).toString()}까지`;
    }
  }, [timeToUse, timeToUseDate]);
  const participantText = useMemo(() => participant.length, [participant]);
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
        <Button fullWidth>참여하기</Button>
      </div>
    </div>
  );
}

export default InformationPage;
