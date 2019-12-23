import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import Input from "../../Form/Input";
import { mobile } from "../../../lib/viewport";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import Category from "../../Form/Category";
import ProfileImageModify from "./ProfileImageModify";
import Button from "../../Form/Button";
import { modifyNickname, modifyInterest } from "../../../lib/api/modify";

const Form = styled.form`
  margin-top: 55px;
  .category {
    margin-top: 40px;
    width:60%;
    margin: 0 auto;
    .categorys {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .fields {
    display:flex;
    justify-content:center;
    margin-bottom: 20px;
    .field {
      width:60%;
      display: flex;
      justify-content:center;
      align-items: center;
      margin: .5em 0;
      span {
        white-space: nowrap;
        margin-right: 24px;
        display: block;
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
  .submit {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

interface ProfileModifyFormProps {
  uid: string,
  nickname: string,
  email: string,
  interest: string[]
  profileImage?: string;
}
function ProfileModifyForm(data: ProfileModifyFormProps) {
  const [nickname, setNickname] = useState(data.nickname);
  const { categorys, token } = useSelector((state: RootState) => ({ ...state.Categorys, ...state.Auth }));
  const [selected, setSelected] = useState(categorys.map((category) => data.interest.includes(category)));

  const toggle = useCallback((i: number) => {
    return () => {
      const _selected = [...selected];
      _selected[i] = !_selected[i];

      setSelected(_selected);
    }
  }, [selected]);
  const submitNickname = useCallback(() => {
    if (!token) return;
    modifyNickname(nickname, token)
      .then(() => alert("완료"))
      .catch(e => alert(e.message));
  }, [nickname]);
  const submitInterest = useCallback(() => {
    if (!token) return;
    const interest: string[] = categorys.map((data, i) => selected[i] && data).filter((data) => typeof data === 'string') as any;
    modifyInterest(interest, token)
      .then(() => alert("완료"))
      .catch(e => alert(e.message));
  }, [categorys, selected, token]);
  return (
    <Form onSubmit={e => e.preventDefault()}>
      <div className="profile">
        <ProfileImageModify nickname={nickname} image={data.profileImage} />
      </div>
      <div className="fields">
        <div className="field">
          <span>닉네임</span>
          <Input value={nickname} onChange={e => setNickname(e.target.value)} />
          <Button onClick={submitNickname} style={{ marginLeft: 10 }}>수정</Button>
        </div>
      </div>
      <div className="category">
        <h1>관심 있는 카테고리</h1>
        <div className="categorys">
          {categorys.map((name, i) => <Category key={i} select={selected[i]} onClick={toggle(i)}>{name}</Category>)}
        </div>
        <div className="submit">
          <Button onClick={submitInterest} long>적용</Button>

        </div>
      </div>
    </Form>
  );
}

export default ProfileModifyForm;
