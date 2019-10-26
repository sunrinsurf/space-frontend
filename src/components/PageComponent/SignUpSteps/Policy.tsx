import React from "react";
import styled from "styled-components";
import SignUpStepProps from "./SignUpStepProps";
import Button from "../../Form/Button";
import Policy from "../../Policy";

const PolicyBox = styled.div`
  padding: 1.5em 1em;
  border: 1px solid #b3b3b3;
  border-radius: 0.5em;
`;
const PolicyContentsBox = styled.div`
  overflow-y: auto;
  max-height: 40vh;
`;
function PolicyStep({ toNext }: SignUpStepProps) {
  return (
    <PolicyBox>
      <h1>약관 동의</h1>
      <PolicyContentsBox>
        <Policy />
      </PolicyContentsBox>
      <Button fullWidth style={{ marginTop: "2em" }} onClick={toNext}>
        동의하고 다음으로
      </Button>
    </PolicyBox>
  );
}

export default PolicyStep;
