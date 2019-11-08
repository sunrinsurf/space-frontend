import React from "react";
import Page from "../Page";
import SignUpStep from "../PageComponent/SignUpStep";
function SignUpPage() {
  return (
    <Page whiteColor colorfulLogo title="회원가입">
      <SignUpStep />
    </Page>
  );
}

export default SignUpPage;
