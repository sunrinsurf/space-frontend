import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TextCheckLabel } from "../../Form/TextCheck";
import "./SignInForm.css";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from "../../../store/reducer";
import * as SignIn from '../../../store/SignIn';
import useLogin from "../../../lib/useLogin";
import Favicon from "../../Layout/Favicon";

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
      <div className="SignInForm__brand">
        <Favicon width="200" />
        <h1>LOGIN</h1>
      </div>
      <div className="SignInForm__remember">
        <TextCheckLabel onClick={toggleRemember} checked={remember}>Remember Me</TextCheckLabel>
      </div>
      <form onSubmit={onSubmit} className="SignInForm__form">
        <Input type="text" placeholder="ID" onChange={handleChange("uid")} value={uid} />
        <Input type="password" placeholder="PW" onChange={handleChange("password")} value={password} />
        <Button fullWidth>LOGIN</Button>
      </form>

      <div className="SignInForm__social">
        <div className="typo">
          <hr />
          <span>SNS로 시작하기</span>
          <hr />
        </div>
        <div className="logins">

        </div>
      </div>
      <div className="SignInForm__forget">
        <Link to="/find">Forget password?</Link> /{" "}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInForm;
