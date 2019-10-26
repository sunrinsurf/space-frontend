import React from 'react'
import Policy from '../Policy'
import Page from '../Page'

function PolicyPage() {
    return (
        <Page title="이용약관">
            <div style={{
                padding: '2em',
                maxWidth: 1024,
                margin: '0 auto'
            }}>
                <Policy />
            </div>
        </Page>
    )
}

export default PolicyPage;