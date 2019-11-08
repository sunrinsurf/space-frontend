import React from "react";
import Page from "../Page";
import "../../styles/signin.css";
import SignInForm from "../PageComponent/SignInForm";

function SignInPage() {
  return (
    <Page title="로그인" whiteColor colorfulLogo noFooter noPadding hideMenu noScrolling>
      <SignInForm />
    </Page>
  );
}

export default SignInPage;
