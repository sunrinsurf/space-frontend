import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import PolicyStep from "./SignUpSteps/Policy";
import SignUpStepProps from "./SignUpSteps/SignUpStepProps";
import SignUpInfo from "./SignUpSteps/SignUpInfo";
import SelectCategory from "./SignUpSteps/SelectCategory";
import { RootState } from "../../store/reducer";
import { setPage, signUpClear } from "../../store/SignUp";
import SignUpComplete from "./SignUpSteps/SignUpComplete";
import { Redirect } from 'react-router-dom'

const Box = styled.div`
  margin: 0 auto;
  padding: 1em;
  box-sizing: border-box;
`;
const Footer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const StepCircle = styled.div<{ current?: boolean; prev?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 10px;
  margin: 0 0.5em;
  transition: background 0.5s;

  ${props => {
    if (props.current) {
      return css`
        background: #1183fa;
      `;
    }
    if (props.prev) {
      return css`
        background: #1183fa;
        cursor: pointer;
      `;
    }
    return css`
      background: #dadada;
    `;
  }}
`;

// 이 곳에 단계를 추가하면 됨
const steps: ((props: SignUpStepProps) => any)[] = [
  PolicyStep,
  SignUpInfo,
  SelectCategory,
  SignUpComplete
];
function SignUpStep() {
  const [redirect, setRedirect] = useState(false);
  const page = useSelector((state: RootState) => state.SignUp.page);
  const dispatch = useDispatch();
  const toNext = useCallback(() => {
    if (page + 1 >= steps.length) {
      setRedirect(true);
      return;
    }
    dispatch(setPage(page + 1));
  }, [dispatch, page]);
  const toPage = useCallback(
    (i: number) => {
      return () => {
        if (page <= i) return;
        dispatch(setPage(i));
      };
    },
    [dispatch, page]
  );
  useEffect(() => {
    dispatch(signUpClear());
  }, [dispatch]);
  const Step = steps[page];
  return (
    <Box>
      {redirect && <Redirect to="/" />}
      <div>
        <Step toNext={toNext} />
      </div>
      <Footer>
        {steps.map((_, idx) => {
          if (idx === page) return <StepCircle current key={idx} />;
          return (
            <StepCircle key={idx} onClick={toPage(idx)} prev={idx < page} />
          );
        })}
      </Footer>
    </Box>
  );
}

export default SignUpStep;
