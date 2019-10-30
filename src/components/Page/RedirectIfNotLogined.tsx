import React from 'react'
import useLogin from '../../lib/useLogin'
import { Redirect } from 'react-router-dom';

function RedirectIfNotLogined() {
    const user = useLogin();
    if (!user) {
        return <Redirect to="/signin" />
    }
    return null;
}

export default RedirectIfNotLogined;