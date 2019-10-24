import React, { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from "styled-components";
import PolicyStep from "./SignUpSteps/Policy";
import SignUpStepProps from "./SignUpSteps/SignUpStepProps";
import SignUpInfo from "./SignUpSteps/SignUpInfo";
import SelectCategory from "./SignUpSteps/SelectCategory";
import { RootState } from "../../store/reducer";
import { setPage } from "../../store/SignUp";

const Box = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 1em;
  box-sizing: border-box;
`;
const Footer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const StepCircle = styled.div<{ current?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 0 0.5em;

  ${props => {
    if (props.current) {
      return css`
        background: #6b32a8;
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
  SelectCategory
];
function SignUpStep() {
  const page = useSelector((state: RootState) => state.SignUp.page);
  const dispatch = useDispatch();
  const toNext = useCallback(() =>{
    if (page + 1 >= steps.length) {
      return;
    }
    dispatch(setPage(page + 1));
  }, [dispatch, page]);
  const Step = steps[page];
  return (
    <Box>
      <div>
        <Step toNext={toNext} />
      </div>
      <Footer>
        {steps.map((_, idx) => {
          if (idx === page) return <StepCircle current key={idx} />;
          return <StepCircle key={idx} />;
        })}
      </Footer>
    </Box>
  );
}

export default SignUpStep;
