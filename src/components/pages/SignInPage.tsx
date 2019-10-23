import React from 'react';
import Page from '../Page';
import '../../styles/signin.css';
import SignInForm from '../PageComponent/SignInForm';

function SignInPage() {
    return (
        <Page title="로그인" noLayout>
            <div className="SignIn__wrap">
                <header className="SignIn__header">
                    <h1><span role="img" aria-label="rocket">🚀</span> Space</h1>
                </header>
                <main className="SignIn__main">
                    <SignInForm />
                </main>
            </div>
        </Page>
    )
}

export default SignInPage;