import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpStepProps from "./SignUpStepProps";
import SignUpInfoCert from "./SignUpInfoCert";

import Input from "../../Form/Input";
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
        <h1>회원정보 입력</h1>
        <div className="SignUpInfo__form">
          <div>
            <Column column="name">
              {(onchange, name) => (
                <Input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={onchange}
                />
              )}
            </Column>
            <Column column="id">
              {(onchange, id) => (
                <Input
                  type="text"
                  placeholder="아이디"
                  value={id}
                  onChange={onchange}
                />
              )}
            </Column>
            <Column column="password">
              {(onchange, password) => (
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  autoComplete="new-password"
                  onChange={onchange}
                />
              )}
            </Column>
            <Column column="password_accept">
              {(onchange, password_accept) => (
                <Input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={password_accept}
                  autoComplete="new-password"
                  onChange={onchange}
                />
              )}
            </Column>
          </div>
          <div>
            <Column column="email">
              {(onchange, email) => (
                <Input type="email" placeholder="이메일" value={email} onChange={onchange} />
              )}
            </Column>
            <Column column="address">
              {(onchange, address) => (
                <Input
                  type="text"
                  placeholder="주소"
                  value={address}
                  onChange={onchange}
                />
              )}
            </Column>
            <SignUpInfoPhone />
          </div>
        </div>
        <Button
          style={{ borderRadius: 26, paddingLeft: "2em", paddingRight: "2em" }}
          onClick={SignUpInfoCert}
        >
          본인인증
          </Button>
      </form>
      <Button fullWidth onClick={next} style={{ marginTop: "2em", borderRadius: 26 }}>
        다음으로
      </Button>
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
