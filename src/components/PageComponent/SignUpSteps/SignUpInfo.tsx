import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpStepProps from "./SignUpStepProps";

import Input from "../../Form/Input2";
import Button from "../../Form/Button";
import Favicon from "../../Layout/Favicon";

import './SignUpInfo.css';

import { RootState } from "../../../store/reducer";
import {
  inputChange,
  inputError,
  inputErrorClear
} from "../../../store/SignUp";
import SignUpInfoMatch from "./SignUpInfoMatch";
import SignUpInfoPhone from "./SignUpInfoPhone";

function SignUpInfo({ toNext }: SignUpStepProps) {
  const { form, token } = useSelector((state: RootState) => ({ form: state.SignUp.form, token: state.SignUp.certToken }));

  const next = useCallback(() => {
    if (!form.address || !form.id || !form.name || !form.password || !form.password_accept || !form.phone || !form.username || !form.email) {
      alert("빈 칸을 모두 채워주세요.");
      return;
    }
    if (form.password_accept !== form.password) {
      alert("비밀번호를 다시 확인해주세요.");
      return;
    }
    if (!token) {
      alert('휴대폰 번호를 인증해주세요.');
      return;
    }
    toNext();
  }, [form, token, toNext]);
  return (
    <div>
      <form className="SignUpInfo__wrap">
        <Favicon width="100" />
        <h1 style={{ fontSize: 36 + "px" }}>회원정보 입력</h1>
        <div className="SignUpInfo__form">
          <div className="SignUpInfo__left">
            <Column column="name">
              {(onchange, name) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">이름</div>
                  <div style={{ minWidth: 80 + "%" }}>
                    <Input
                      type="text"
                      value={name}
                      onChange={onchange}
                    />
                  </div>
                </div>
              )}
            </Column>
            <Column column="id">
              {(onchange, id) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">아이디</div>
                  <div style={{ minWidth: 80 + "%" }}>
                    <Input
                      type="text"
                      value={id}
                      onChange={onchange}
                    />
                  </div>
                </div>
              )}
            </Column>
            <Column column="password">
              {(onchange, password) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">비밀번호</div>
                  <div style={{ minWidth: 80 + "%" }}>

                    <Input
                      type="password"
                      value={password}
                      autoComplete="new-password"
                      onChange={onchange}
                    />
                  </div>
                </div>
              )}
            </Column>
            <Column column="password_accept">
              {(onchange, password_accept) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">비밀번호 확인</div>
                  <div style={{ minWidth: 80 + "%" }}>

                    <Input
                      type="password"
                      value={password_accept}
                      autoComplete="new-password"
                      onChange={onchange}
                    />
                  </div>
                </div>
              )}
            </Column>
          </div>
          <div className="SignUpInfo__right">
            <Column column="username">
              {(onchange, username) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">닉네임</div>
                  <div style={{ minWidth: 80 + "%" }}>

                    <Input
                      type="text"
                      value={username}
                      onChange={onchange}
                    />
                  </div>
                </div>
              )}
            </Column>
            <Column column="email">
              {(onchange, email) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">이메일</div>
                  <div style={{ minWidth: 80 + "%" }}>

                    <Input type="email" value={email} onChange={onchange} />
                  </div>
                </div>
              )}
            </Column>
            <Column column="address">
              {(onchange, address) => (
                <div className="SignUpInfo__Column">
                  <div className="SignUpInfo__title">주소 입력</div>
                  <div style={{ minWidth: 80 + "%" }}>

                    <Input
                      type="text"
                      value={address}
                      onChange={onchange}
                    />
                  </div>
                </div>
              )}
            </Column>
            <SignUpInfoPhone />
          </div>
        </div>
      </form>
      <div className="SignUpInfo__Button">
        <Button fullWidth onClick={next} style={{ marginTop: "2em", borderRadius: 26 }}>
          동의하고 다음으로
        </Button>
      </div>
    </div >
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
      Promise.resolve(SignUpInfoMatch(column, e.target.value)).then(([isValid, message]) => {

        if (!isValid) {
          const msg: string = message.toString();
          dispatch(inputError({ [column]: msg }));
        } else if (error) {
          dispatch(inputErrorClear([column]));
        }
      });
    },
    [dispatch, column, error, valueWrapper]
  );
  const data = children(onChange, value);

  return (
    <div>
      {data}
      {error && <div style={{ marginBottom: 10, color: "red" }}>{error}</div>}
    </div>
  );
}
export default SignUpInfo;
