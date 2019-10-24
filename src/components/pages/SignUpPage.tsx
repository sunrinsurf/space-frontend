import React from "react";
import Page from "../Page";
import SignLayout from "../Layout/SignLayout";
import SignUpStep from "../PageComponent/SignUpStep";

function SignUpPage() {
  return (
    <Page noLayout title="회원가입">
      <SignLayout>
        <SignUpStep />
      </SignLayout>
    </Page>
  );
}

export default SignUpPage;
