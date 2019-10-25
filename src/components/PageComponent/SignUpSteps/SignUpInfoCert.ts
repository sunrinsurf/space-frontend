import React from "react";
import store from "../../../store";
import { requestPhone } from "../../../store/PhoneCert";
function SignUpInfoCert(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  const phone: string | undefined = store.getState().SignUp.form.phone;
  if (!phone) {
    alert("전화번호를 입력해 주세요.");
    return;
  }

  store.dispatch(requestPhone());
  return;
}

export default SignUpInfoCert;
