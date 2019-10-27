import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TextCheckLabel } from "../Form/TextCheck";
import "./SignInForm.css";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from "../../store/reducer";
import * as SignIn from '../../store/SignIn';
import useLogin from "../../lib/useLogin";

function SignInForm() {
  const { remember, uid, password, success } = useSelector((state: RootState) => ({ success: state.SignIn.success, ...state.SignIn.form }));
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useLogin();

  const toggleRemember = useCallback(() => {
    dispatch(SignIn.changeForm({ remember: !remember }));
  }, [dispatch, remember])
  const handleChange = useCallback((col: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(SignIn.changeForm({ [col]: e.target.value }));
    }
  }, [dispatch]);
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SignIn.requestAuth());
  }, [dispatch]);
  useEffect(() => {
    if (success || isLogin) history.push('/');
  }, [success, history, isLogin]);

  return (
    <div className="SignInForm__wrap">
      <div className="SignInForm__remember">
        <TextCheckLabel onClick={toggleRemember} checked={remember}>Remember Me</TextCheckLabel>
      </div>
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="아이디" onChange={handleChange("uid")} value={uid} />
        <Input type="password" placeholder="비밀번호" onChange={handleChange("password")} value={password} />
        <Button fullWidth>로그인</Button>
      </form>
      <div className="SignInForm__social">
        <Button background={false}>F</Button>
        <Button background={false}>N</Button>
        <Button background={false}>K</Button>
      </div>
      <div className="SignInForm__forget">
        <Link to="/find">Forget password?</Link> /{" "}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInForm;
