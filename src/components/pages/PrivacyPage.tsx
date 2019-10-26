import React from 'react'
import Page from '../Page'
import Privacy from '../Policy/Privacy'

function PrivacyPage() {
    return (
        <Page title="개인정보보호방침">
            <div style={{
                padding: '2em',
                maxWidth: 1024,
                margin: '0 auto'
            }}>
                <Privacy />
            </div>
        </Page>
    )
}
export default PrivacyPage;