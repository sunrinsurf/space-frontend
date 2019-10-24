import React, { useState } from "react";
import styled, { css } from "styled-components";
import PolicyStep from "./SignUpSteps/Policy";
import SignUpStepProps from "./SignUpSteps/SignUpStepProps";
import SignUpInfo from "./SignUpSteps/SignUpInfo";
import SelectCategory from "./SignUpSteps/SelectCategory";

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
  const [i, setI] = useState(0);

  function toNext() {
    if (i + 1 >= steps.length) {
      return;
    }
    setI(i + 1);
  }
  const Step = steps[i];
  return (
    <Box>
      <div>
        <Step toNext={toNext} />
      </div>
      <Footer>
        {steps.map((_, idx) => {
          if (idx === i) return <StepCircle current key={idx} />;
          return <StepCircle key={idx} />;
        })}
      </Footer>
    </Box>
  );
}

export default SignUpStep;
