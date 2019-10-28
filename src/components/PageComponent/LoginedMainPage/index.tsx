import React from 'react'
import LoginedMainPageSearch from './LoginedMainPageSearch'
import getClassHandler from '../../../lib/getClassHandler'

import './index.css';
import Shares from '../../Shares';
import FavoriteCategory from '../../FavoriteCategory';

const getName = getClassHandler('LoginedMainPage');
function LoginedMainPage() {
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
        </div>
    )
}
export default LoginedMainPage;