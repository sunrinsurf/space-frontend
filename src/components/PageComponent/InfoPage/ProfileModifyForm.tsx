import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import Input from "../../Form/Input";
import { mobile } from "../../../lib/viewport";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import Category from "../../Form/Category";
import ProfileImageModify from "./ProfileImageModify";

const Form = styled.form`
  margin-top: 55px;
  .category {
    margin-top: 40px;
    .categorys {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .fields {
    margin-bottom: 20px;
    .field {
      display: flex;
      align-items: center;
      margin: .5em 0;
      span {
        word-break: keep-all;
        white-space: nowrap;
        margin-right: 24px;
        display: block;
        flex: 1;
        text-align: right;

        ${mobile(css`
          margin-right: 10px;
          flex: 1.2;
        `)}
      }
  }
    input {
      flex: 2;
    }
  }
  .profile {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
`;

interface FieldProps {
  fieldName: string;
  value?: string;
  set?: any;
}

function Field({ fieldName, value, set }: FieldProps) {
  return (
    <div className="field">
      <span>{fieldName}</span>
      <Input value={value} />
    </div>
  );
}
interface ProfileModifyFormProps {
  uid: string,
  nickname: string,
  email: string,
  interest: string[]
  profileImage?: string;
}
function ProfileModifyForm(data: ProfileModifyFormProps) {
  const [nickname, setNickname] = useState(data.nickname);
  const { categorys } = useSelector((state: RootState) => state.Categorys);
  const [selected, setSelected] = useState(categorys.map((category) => data.interest.includes(category)));

  const toggle = useCallback((i: number) => {
    return () => {
      const _selected = [...selected];
      _selected[i] = !_selected[i];

      setSelected(_selected);
    }
  }, [selected]);
  return (
    <Form>
      <div className="profile">
        <ProfileImageModify nickname={nickname} image={data.profileImage} />
      </div>
      <div className="fields">
        <Field fieldName="닉네임" value={nickname} set={setNickname} />
      </div>
      <hr />
      <div className="category">
        <h1>관심 있는 카테고리</h1>
        <div className="categorys">
          {categorys.map((name, i) => <Category key={i} select={selected[i]} onClick={toggle(i)}>{name}</Category>)}
        </div>
      </div>
    </Form>
  );
}

export default ProfileModifyForm;
