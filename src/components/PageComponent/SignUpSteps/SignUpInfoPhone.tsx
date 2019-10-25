import React, { useState, useCallback } from "react";
import { Column } from "./SignUpInfo";
import styled from "styled-components";
import Button from "../../Form/Button";
import SignUpInfoCert from "./SignUpInfoCert";
import Input from "../../Form/Input";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/reducer";
import { verifyToken } from "../../../store/PhoneCert";

const Flex = styled.div`
  display: flex;
`;

function phoneNumberWrap(str: string): string | boolean {
  if (str === "") return "";
  if (!str.match(/^[0-9-]+$/)) {
    return false;
  }
  let data = str.replace(/-/g, "");
  const [num1, num2, num3] = [
    data.slice(0, 3),
    data.slice(3, 7),
    data.slice(7, 11)
  ];
  let n = num1;
  if (num2) {
    n += "-" + num2;
  }
  if (num3) {
    n += "-" + num3;
  }
  return n;
}

function SignUpInfoPhone() {
  const { progress, success } = useSelector((state: RootState) => state.PhoneCert);

  return (
    <Column column="phone" valueWrapper={phoneNumberWrap}>
      {(onchange, phone) => (
        <>
          <Flex>
            <Input
              type="text"
              placeholder="전화번호"
              value={phone}
              style={{ flex: 1 }}
              onChange={onchange}
              disabled={success}
            />
            <Button
              style={{ margin: "1em 0 1em 1em", height: "fit-content" }}
              onClick={SignUpInfoCert}
              disabled={success}
            >
              본인인증
          </Button>
          </Flex>
          {progress && <PhoneCode />}
          {success && <span style={{ color: 'green' }}>인증에 성공했습니다.</span>}
        </>
      )}
    </Column>
  );
}

function PhoneCode() {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value);
  }
  const onverify = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(verifyToken(code));
  }, [code, dispatch]);
  return (
    <div>
      <p>인증 번호 입력</p>
      <Flex>
        <Input type="number" placeholder="인증번호" onChange={onchange} value={code} style={{ flex: 1 }} />
        <Button onClick={onverify} style={{ margin: "1em 0 1em 1em", height: "fit-content" }}>
          인증
        </Button>
      </Flex>
    </div>
  )
}
export default SignUpInfoPhone;
