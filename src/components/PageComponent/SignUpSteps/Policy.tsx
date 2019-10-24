import React from "react";
import styled from "styled-components";
import SignUpStepProps from "./SignUpStepProps";
import Button from "../../Form/Button";

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
        <PolicyContents />
      </PolicyContentsBox>
      <Button fullWidth style={{ marginTop: "2em" }} onClick={toNext}>
        동의하고 다음으로
      </Button>
    </PolicyBox>
  );
}

// 임시용
function PolicyContents() {
  return (
    <>
      <p>
        Voluptate pariatur ullamco exercitation aute aute ipsum quis veniam
        adipisicing Lorem voluptate consectetur laborum incididunt. Aliquip do
        veniam eu sunt dolor irure incididunt culpa ipsum consequat minim eu
        Lorem exercitation. Minim proident veniam dolore elit commodo fugiat.At
        sit quia quia voluptas. Facilis sed totam velit et. Facilis aut neque
        qui ex voluptate fuga eligendi. Cumque sed ut eos officiis rerum. Porro
        ducimus non velit. Quo qui est ipsam odio id animi sit non id.
      </p>
      <p>
        Quo et quis libero. Et et omnis accusamus voluptas sit. At reiciendis
        numquam unde qui nihil. Sit ea at suscipit quos et molestias. Enim et
        perspiciatis enim dolorem eum consequatur.
      </p>
      <p>
        Eaque eveniet dicta non sit. Et corporis perspiciatis dolorum molestias
        reprehenderit voluptatibus magni. Nihil maxime velit neque ut voluptas
        omnis nulla sit. Et voluptas quam aliquid ut ullam. Totam in praesentium
        sunt. Quod blanditiis facilis est maiores iure reprehenderit.
      </p>
    </>
  );
}
export default PolicyStep;
