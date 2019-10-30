import React from 'react'
import { useHistory } from 'react-router-dom';
import LoginedMainPageSearch from './LoginedMainPageSearch'
import getClassHandler from '../../../lib/getClassHandler'

import './index.css';
import Shares from '../../Shares';
import FavoriteCategory from '../../FavoriteCategory';
import Button from '../../Form/Button';

const getName = getClassHandler('LoginedMainPage');
function LoginedMainPage() {
    const history = useHistory();
    function goToWrite() {
        history.push('/write');
    }
    return (
        <div className={getName("wrap")}>
            <LoginedMainPageSearch />
            <section>
                <h1>진행 중인 공유</h1>
                <Shares />
            </section>
            <section>
                <h1>나의 관심 카테고리</h1>
                <FavoriteCategory />
            </section>
            <section>
                <h1>공유 시작하기</h1>
                <h3>물건, 장소, 교통수단, 구독 서비스 등 무엇이든 공유하고, 수익을 남겨 보세요.</h3>
                <Button onClick={goToWrite} fullWidth>상품 공유하기</Button>
            </section>
        </div>
    )
}
export default LoginedMainPage;