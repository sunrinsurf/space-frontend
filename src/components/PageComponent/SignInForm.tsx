import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextCheck from "../Form/TextCheck";
import "./SignInForm.css";
import Input from "../Form/Input";
import Button from "../Form/Button";

function SignInForm() {
  const rememberState = useState(false);
  return (
    <div className="SignInForm__wrap">
      <div className="SignInForm__remember">
        <TextCheck state={rememberState}>Remember Me</TextCheck>
      </div>
      <form>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <Button fullWidth>로그인</Button>
      </form>
      <div className="SignInForm__social">
        <Button background={false}>가</Button>
        <Button background={false}>나</Button>
        <Button background={false}>다</Button>
      </div>
      <div className="SignInForm__forget">
        <Link to="/find">Forget password?</Link> /{" "}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInForm;
