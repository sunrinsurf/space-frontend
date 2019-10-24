import React, { useCallback } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import SignUpStepProps from "./SignUpStepProps";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import { RootState } from "../../../store/reducer";
import { inputChange } from "../../../store/SignUp";
import SignUpInfoCert from "./SignUpInfoCert";
import SignUpInfoMatch from "./SignUpInfoMatch";

const Flex = styled.div`
  display: flex;
`;
function SignUpInfo({ toNext }: SignUpStepProps) {
  const {
    id,
    password,
    password_accept,
    username,
    name,
    phone,
    address
  } = useSelector((state: RootState) => state.SignUp.form);
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      const [isValid, message] = SignUpInfoMatch(e.target.name, e.target.value);
      dispatch(
        inputChange({
          [e.target.name]: e.target.value
        })
      );
    },
    [dispatch]
  );
  return (
    <div>
      <form onChange={onChange}>
        <Input type="text" placeholder="아이디" defaultValue={id} name="id" />
        <Input
          type="password"
          placeholder="비밀번호"
          defaultValue={password}
          name="password"
          autoComplete="new-password"
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          defaultValue={password_accept}
          name="password_accept"
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder="닉네임"
          defaultValue={username}
          name="username"
        />
        <Input
          type="text"
          placeholder="이름 (본명)"
          defaultValue={name}
          name="name"
        />
        <Flex>
          <Input
            type="text"
            placeholder="전화번호"
            defaultValue={phone}
            name="phone"
            style={{ flex: 1 }}
          />
          <Button style={{ margin: '1em 0 1em 1em', height: 'fit-content' }} onClick={SignUpInfoCert}>본인인증</Button>
        </Flex>
        <Input
          type="text"
          placeholder="주소"
          defaultValue={address}
          name="address"
        />
      </form>
      <Button fullWidth onClick={toNext}>
        다음으로
      </Button>
    </div>
  );
}

export default SignUpInfo;
