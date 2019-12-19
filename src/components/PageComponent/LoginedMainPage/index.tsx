import React from 'react'
import { useHistory } from 'react-router-dom';
import LoginedMainPageSearch from './LoginedMainPageSearch'
import getClassHandler from '../../../lib/getClassHandler'

import './index.css';
import Shares from '../../Shares';
import Button from '../../Form/Button';

const getName = getClassHandler('LoginedMainPage');
function LoginedMainPage() {
    const history = useHistory();
    function goToWrite() {
        history.push('/write');
    }
    return (
        <div className={getName("wrap")}>
            <section style={{ marginBottom: 150 }}>
                <h1>공유 시작하기</h1>
                <h3>물건, 장소, 교통수단, 구독 서비스 등 무엇이든 공유하고, 수익을 남겨 보세요.</h3>
                <Button onClick={goToWrite} fullWidth>상품 공유하기</Button>
            </section>
            <LoginedMainPageSearch />
            <section>
                <h1>최근 공유된 상품</h1>
                <Shares />
            </section>
        </div>
    )
}
export default LoginedMainPage;