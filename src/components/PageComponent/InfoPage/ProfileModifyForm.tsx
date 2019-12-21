import React from "react";
import styled, { css } from "styled-components";
import Input from "../../Form/Input";
import { tablet } from "../../../lib/viewport";

const Form = styled.form`
  margin-top: 55px;
  .row {
    .field {
      display: flex;
      align-items: center;
      span {
        word-break: keep-all;
        white-space: nowrap;
        font-size: 20px;
        margin-right: 24px;
        display: block;
        width: 200px;
        text-align: right;
      }
    }
  }

  ${tablet(css`
    display: flex;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    justify-content: space-around;
  `)}
`;
interface FieldProps {
  fieldName: string;
}

function Field({ fieldName }: FieldProps) {
  return (
    <div className="field">
      <span>{fieldName}</span>
      <Input />
    </div>
  );
}
function ProfileModifyForm() {
  return (
    <Form>
      <div className="row">
        <Field fieldName="이름" />
        <Field fieldName="아이디" />
        <Field fieldName="비밀번호" />
        <Field fieldName="비밀번호 재입력" />
      </div>
      <div className="row">
        <Field fieldName="이메일" />
        <Field fieldName="닉네임" />
        <Field fieldName="주소 입력" />
        <Field fieldName="전화번호" />
      </div>
    </Form>
  );
}

export default ProfileModifyForm;
