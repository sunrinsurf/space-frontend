import React from 'react'
import styled from 'styled-components'
import SignUpStepProps from './SignUpStepProps';
import Button from '../../Form/Button';

const Wrap = styled.div`
    padding: 1.5em;
    text-align: center;
`;
function SignUpComplete({ toNext }: SignUpStepProps) {
    return (
        <Wrap>
            <h1>완료!</h1>
            <p>회원가입이 완료되었습니다.</p>
            <Button fullWidth onClick={toNext}>
                메인으로 가기
            </Button>
        </Wrap>
    )
}
export default SignUpComplete;