import React from 'react';
import store from '../../../store';
function SignUpInfoCert(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const phone: string | undefined = store.getState().SignUp.form.phone;
    if (!phone) {
        alert("전화번호를 입력해 주세요.");
        return;
    }

    // 대충 서버로 요청하는 부분
    return;
}

export default SignUpInfoCert;