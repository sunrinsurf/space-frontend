import React from "react";
import Page from "../Page";
import "../../styles/signin.css";
import SignInForm from "../PageComponent/SignInForm";
import SignLayout from "../Layout/SignLayout";

function SignInPage() {
  return (
    <Page title="로그인" noLayout>
      <SignLayout>
        <div className="SignIn__main">
          <SignInForm />
        </div>
      </SignLayout>
    </Page>
  );
}

export default SignInPage;
