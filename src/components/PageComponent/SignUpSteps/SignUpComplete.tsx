import React from 'react'
import styled from 'styled-components'
import SignUpStepProps from './SignUpStepProps';
import Button from '../../Form/Button';
import Favicon from '../../Layout/Favicon';
import { ReactComponent as Adventure } from '../../../assets/adventure.svg';
const Wrap = styled.div`
    padding: 1.5em;
    text-align: center;
    height:55vh;
    min-height: 500px;
    display:flex;
    justify-content :flex-end;
    align-items:center;
    flex-direction:column;
`;
function SignUpComplete({ toNext }: SignUpStepProps) {
    return (
        <Wrap>
            <h1>완료!<br />회원가입을 환영합니다 :)</h1>
            <div>
                <Adventure style={{ maxWidth: '96%' }} />
            </div>

            <div style={{ maxWidth: "700px", marginTop: 20 }}>
                <Button fullWidth onClick={toNext}>
                    메인으로 가기
                </Button>
            </div>
        </Wrap >
    )
}
export default SignUpComplete;