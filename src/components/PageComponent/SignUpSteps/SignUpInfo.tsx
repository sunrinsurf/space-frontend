import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpStepProps from "./SignUpStepProps";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import { RootState } from "../../../store/reducer";
import { inputChange } from "../../../store/SignUp";

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
        <Input
          type="text"
          placeholder="전화번호"
          defaultValue={phone}
          name="phone"
        />
        <Input
          type="text"
          placeholder="주소"
          defaultValue={address}
          name="address"
        />
        <Button>본인인증</Button>
      </form>
      <Button fullWidth onClick={toNext}>
        다음으로
      </Button>
    </div>
  );
}

export default SignUpInfo;
