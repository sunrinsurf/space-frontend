import React from 'react'
import Page from '../Page'
import WritePageForm from '../PageComponent/WritePage'
import RedirectIfNotLogined from '../Page/RedirectIfNotLogined'

function WritePage() {
    return (
        <Page>
            <RedirectIfNotLogined />
            <WritePageForm />
        </Page>
    )
}

export default WritePage;