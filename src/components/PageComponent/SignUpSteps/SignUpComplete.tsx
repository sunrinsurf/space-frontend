import React from 'react'
import styled from 'styled-components'
import SignUpStepProps from './SignUpStepProps';
import Button from '../../Form/Button';
import Favicon from '../../Layout/Favicon';
const Wrap = styled.div`
    padding: 1.5em;
    text-align: center;
    height:60vh;
    display:flex;
    justify-content :flex-end;
    align-items:center;
    flex-direction:column;
`;
function SignUpComplete({ toNext }: SignUpStepProps) {
    return (
        <Wrap>
            <div style={{ width: "250px" }}>
                <Favicon></Favicon>
            </div>
            <h1>완료!</h1>
            <p>회원가입을 환영합니다.</p>
            <div style={{ maxWidth: "700px" }}>
                <Button fullWidth onClick={toNext}>
                    메인으로 가기
                </Button>
            </div>
        </Wrap >
    )
}
export default SignUpComplete;