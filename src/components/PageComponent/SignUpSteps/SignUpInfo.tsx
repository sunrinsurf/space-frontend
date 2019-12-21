import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpStepProps from "./SignUpStepProps";
import styled from "styled-components"

import Input from "../../Form/Input2";
import Button from "../../Form/Button";
import Favicon from "../../Layout/Favicon";

import "./SignUpInfo.css";

import { RootState } from "../../../store/reducer";
import {
  inputChange,
  inputError,
  inputErrorClear
} from "../../../store/SignUp";
import SignUpInfoMatch from "./SignUpInfoMatch";
import SignUpInfoPhone from "./SignUpInfoPhone";
import UploadProfile from "../../Form/UploadProfile";

const Title = styled.div`
  font-size: 36px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`

const Indication = styled.div`
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom:30px;
  margin-left:20px;
  @media (max-width: 600px) {
    font-size:20px;
  }
`
const Flex = styled.div`
  display:flex;
  width:100%;
  flex-wrap:wrap;
;`
const FullDiv = styled.div`
  width: 100%;
`;
function SignUpInfo({ toNext }: SignUpStepProps) {
  const { form, token } = useSelector((state: RootState) => ({
    form: state.SignUp.form,
    token: state.SignUp.certToken
  }));

  const next = useCallback(() => {
    if (
      !form.address ||
      !form.id ||
      !form.name ||
      !form.password ||
      !form.password_accept ||
      !form.phone ||
      !form.username ||
      !form.email
    ) {
      alert("빈 칸을 모두 채워주세요.");
      return;
    }
    if (form.password_accept !== form.password) {
      alert("비밀번호를 다시 확인해주세요.");
      return;
    }
    if (!token) {
      alert("휴대폰 번호를 인증해주세요.");
      return;
    }
    toNext();
  }, [form, token, toNext]);
  return (
    <div>
      <form className="SignUpInfo__wrap">
        <Favicon width="100" style={{ margin: "0 auto" }} />
        <Title>회원정보 입력</Title>
        <Indication>하단의 빈칸을 모두 채워주세요</Indication>
        <div className="SignUpInfo__form">
          <FullDiv>
            <Column column="name" >
              {(onchange, name) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">이름</div>
                  <div className="Input__Column">
                    <Input type="text" value={name} onChange={onchange} placeholder="홍길동" />
                  </div>
                </div>
              )}
            </Column>
          </FullDiv>
          <FullDiv>
            <Column column="username">
              {(onchange, username) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">닉네임</div>
                  <div className="Input__Column">
                    <Input type="text" value={username} onChange={onchange} placeholder="MisterHong" />
                  </div>
                </div>
              )}
            </Column>
          </FullDiv>
          <FullDiv style={{ flex: "1", margin: "0 20px 20px" }}>
            <div className="SignUpInfo__title" style={{ marginBottom: 10 }}>프로필 사진</div>
            <UploadProfile />
          </FullDiv>
          <Flex>
            <Column column="email">
              {(onchange, email) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">이메일</div>
                  <div className="Input__Column">
                    <Input type="email" value={email} onChange={onchange} placeholder="example@naver.com" />
                  </div>
                </div>
              )}
            </Column>
            <Column column="id">
              {(onchange, id) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">아이디</div>
                  <div className="Input__Column">
                    <Input type="text" value={id} onChange={onchange} placeholder="Hong-ik" />
                  </div>
                </div>
              )}
            </Column>
          </Flex>
          <Flex>
            <Column column="password">
              {(onchange, password) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">비밀번호</div>
                  <div className="Input__Column">
                    <Input
                      type="password"
                      value={password}
                      autoComplete="new-password"
                      onChange={onchange}
                      placeholder="비밀번호"
                    />
                  </div>
                </div>
              )}
            </Column>
            <Column column="password_accept">
              {(onchange, password_accept) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">비밀번호 확인</div>
                  <div className="Input__Column">
                    <Input
                      type="password"
                      value={password_accept}
                      autoComplete="new-password"
                      onChange={onchange}
                      placeholder="비밀번호 확인"
                    />
                  </div>
                </div>
              )}
            </Column>
          </Flex>

          <div style={{ width: "100%" }}>
            <Column column="address">
              {(onchange, address) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">주소 입력</div>
                  <div className="Input__Column">
                    <Input type="text" value={address} onChange={onchange} placeholder="서울특별시 용산구 원효로97길 33-4" />
                  </div>
                </div>
              )}
            </Column>
          </div>
          <SignUpInfoPhone />
        </div>
      </form>
      <div className="SignUpInfo__Button">
        <Button
          fullWidth
          onClick={next}
          style={{ marginTop: "2em", borderRadius: 26 }}
        >
          동의하고 다음으로
        </Button>
      </div>
    </div>
  );
}

interface SignUpInfoColumnProps {
  column: string;
  valueWrapper?: (value: string) => string | boolean;
  children: (
    handler: (e: React.ChangeEvent<HTMLInputElement>) => any,
    defaultData: any
  ) => any;
}
export function Column({
  column,
  children,
  valueWrapper
}: SignUpInfoColumnProps) {
  const value = useSelector((state: RootState) => {
    const form: { [key: string]: any } = state.SignUp.form;
    return form[column];
  });
  const error = useSelector((state: RootState) => {
    const error: { [key: string]: any } = state.SignUp.error;
    return error[column];
  });
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = valueWrapper
        ? valueWrapper(e.target.value)
        : e.target.value;
      if (value !== false) {
        dispatch(
          inputChange({
            [column]: value.toString()
          })
        );
      }
      Promise.resolve(SignUpInfoMatch(column, e.target.value)).then(
        ([isValid, message]) => {
          if (!isValid) {
            const msg: string = message.toString();
            dispatch(inputError({ [column]: msg }));
          } else if (error) {
            dispatch(inputErrorClear([column]));
          }
        }
      );
    },
    [dispatch, column, error, valueWrapper]
  );
  const data = children(onChange, value);

  return (
    <div style={{ flex: "1", margin: "0 20px" }}>
      {data}
      <div className="SignUpInfo__error">
        {error && (
          <div style={{ color: "red", wordBreak: "break-all" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
export default SignUpInfo;
