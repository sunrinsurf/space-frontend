import React from 'react'
import Page from '../../Page';
import Button from '../../Form/Button';
import { useHistory } from 'react-router-dom'

function NotFoundPage() {
    const history = useHistory();

    function goMain() {
        history.push('/');
    }
    return (
        <Page title="404" central>
            <div style={{ margin: '10vh 0' }}>
                <h1>Oops!</h1>
                <p>찾으시는 페이지가 없는 것 같네요.</p>
                <div style={{ marginTop: 25 }}>
                    <Button onClick={goMain} fullWidth>메인으로 가기</Button>
                </div>
            </div>
        </Page>
    )
}

export default NotFoundPage;