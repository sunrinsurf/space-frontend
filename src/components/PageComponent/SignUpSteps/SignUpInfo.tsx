import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import SignUpStepProps from "./SignUpStepProps";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import { RootState } from "../../../store/reducer";
import {
  inputChange,
  inputError,
  inputErrorClear
} from "../../../store/SignUp";
import SignUpInfoCert from "./SignUpInfoCert";
import SignUpInfoMatch from "./SignUpInfoMatch";

const Flex = styled.div`
  display: flex;
`;

function phoneNumberWrap(str: string): string | boolean {
  if (str === "") return "";
  if (!str.match(/^[0-9-]+$/)) {
    return false;
  }
  let data = str.replace(/-/g, "");
  const [num1, num2, num3] = [
    data.slice(0, 3),
    data.slice(3, 7),
    data.slice(7, 11)
  ];
  let n = num1;
  if (num2) {
    n += "-" + num2;
  }
  if (num3) {
    n += "-" + num3;
  }
  return n;
}

function SignUpInfo({ toNext }: SignUpStepProps) {
  return (
    <div>
      <form>
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
        <Column column="username">
          {(onchange, username) => (
            <Input
              type="text"
              placeholder="닉네임"
              value={username}
              onChange={onchange}
            />
          )}
        </Column>
        <Column column="name">
          {(onchange, name) => (
            <Input
              type="text"
              placeholder="이름 (본명)"
              value={name}
              name="name"
              onChange={onchange}
            />
          )}
        </Column>
        <Column column="phone" valueWrapper={phoneNumberWrap}>
          {(onchange, phone) => (
            <Flex>
              <Input
                type="text"
                placeholder="전화번호"
                value={phone}
                style={{ flex: 1 }}
                onChange={onchange}
              />
              <Button
                style={{ margin: "1em 0 1em 1em", height: "fit-content" }}
                onClick={SignUpInfoCert}
              >
                본인인증
              </Button>
            </Flex>
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
      </form>
      <Button fullWidth onClick={toNext}>
        다음으로
      </Button>
    </div>
  );
}

interface SignUpInfoColumnProps {
  column: any;
  valueWrapper?: (value: string) => string | boolean;
  children: (
    handler: (e: React.ChangeEvent<HTMLInputElement>) => any,
    defaultData: any
  ) => any;
}
function Column({ column, children, valueWrapper }: SignUpInfoColumnProps) {
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
      const [isValid, message] = SignUpInfoMatch(column, e.target.value);
      const value = valueWrapper
        ? valueWrapper(e.target.value)
        : e.target.value;
      if (value !== false) {
        dispatch(
          inputChange({
            [column]: value
          })
        );
      }
      if (!isValid) {
        const msg: string = message.toString();
        dispatch(inputError({ [column]: msg }));
      } else if (error) {
        dispatch(inputErrorClear([column]));
      }
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
