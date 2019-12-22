import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import Input, { TextArea } from "../../Form/Input";
import WritePageCategorySelect from "./CategorySelect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../../store/reducer";
import {
  shareChange,
  shareRoyaltySelect,
  shareTimeSelect,
  shareClearForm,
  shareSubmit
} from "../../../store/forms/Share";
import WritePageFormSelect from "./Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../Form/Button";
import WritePageImageUpload from "./ImageUpload";
import ErrorComponent from "../../ErrorComponent";
import favicon from "../../../assets/favicon.svg";

const Section = styled.section`
  padding: 1em;

  h1 {
    font-weight: normal;
    font-size: 20px;
  }
  .sub {
    color: #797979;
    font-size: 15px;
    font-weight: normal;
    margin-left: 30px;
  }
`;

const Favicon = styled.div`
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${favicon});
  margin: 0 auto;
`;
const Title = styled.div`
    font-size: 32px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`
const Form = styled.form`
  width:60%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }

`
function DateButton({ value, onClick }: any) {
  return (
    <Button
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      fullWidth
      style={{ marginTop: "1em" }}
    >
      {value}
    </Button>
  );
}
function WritePageForm() {
  const {
    title,
    contents,
    timeToUseDate,
    person,
    error,
    success,
    progress,
    productId,
    imageProgress
  } = useSelector((state: RootState) => state.Forms.Share);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(shareClearForm());
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      history.push(`/product/${productId}`);
    }
  }, [success, productId, history]);
  const onchange = useCallback(
    name => {
      return (e: React.ChangeEvent) => {
        dispatch(
          shareChange({
            [name]: (e.target as any).value
          })
        );
      };
    },
    [dispatch]
  );
  const onDateChange = useCallback(
    (dataKey: string) => {
      return (date: Date) => {
        if (!date) return;
        if (date.getTime() <= Date.now()) return;
        dispatch(
          shareChange({
            [dataKey]: date
          })
        );
      };
    },
    [dispatch]
  );

  const priceForm = (unit: string) => (
    <div>
      <Input
        type="text"
        onChange={onchange("royaltyPrice")}
        placeholder={`${unit} 가격 입력`}
      />
    </div>
  );
  const timeToUseDatepicker = (
    <DatePicker
      selected={timeToUseDate}
      onChange={onDateChange("timeToUseDate")}
      minDate={new Date()}
      customInput={<DateButton />}
    />
  );
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(shareSubmit());
    },
    [dispatch]
  );

  return (
    <Form onSubmit={onSubmit} >
      <Favicon />
      <Title>상품 등록</Title>
      <Section>
        <h1>카테고리 선택</h1>
        <WritePageCategorySelect />
      </Section>
      <Section>
        <h1>공유 상품 제목</h1>
        <Input value={title} onChange={onchange("title")} />
      </Section>
      <Section>
        <h1>공유 내용</h1>
        <TextArea value={contents} onChange={onchange("contents")} style={{ height: "200px" }} />
      </Section>
      <Section>
        <h1>로열티 지불 방식</h1>
        <WritePageFormSelect
          dispatcher={shareRoyaltySelect}
          objKey="royalty"
          showConditions={{
            monthly: priceForm("월"),
            weekly: priceForm("주")
          }}
        />
      </Section>
      <Section>
        <h1>공유 만료 날짜</h1>
        <WritePageFormSelect
          dispatcher={shareTimeSelect}
          objKey="timeToUse"
          showConditions={{
            selectTime: timeToUseDatepicker
          }}
        />
      </Section>
      <Section>
        <h1>공유 가능 인원</h1>
        <Input
          type="number"
          min="2"
          max="8"
          onChange={onchange("person")}
          value={person}
        />
      </Section>
      <Section>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <h1 style={{ minWidth: "100px" }}>사진 업로드</h1>
          <h3 className="sub">사진은 최대 4장까지 업로드 할 수 있습니다.</h3>
        </div>
        <WritePageImageUpload />
      </Section>
      <div style={{ width: "230px", margin: "0 auto" }}>
        <Button disabled={progress} fullWidth style={{ boxShadow: "0 0 6px 0 #ff388a" }}>{progress ? imageProgress ? "이미지 업로드 중..." : "처리 중..." : "올리기"}</Button>
      </div>
      {error && <ErrorComponent>{error}</ErrorComponent>}
    </Form >
  );
}

export default WritePageForm;
