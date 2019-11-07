import React from 'react'
import useLogin from '../../lib/useLogin'
import { Redirect } from 'react-router-dom';

function RedirectIfLogined() {
    const user = useLogin();
    if (user) {
        return <Redirect to="/signin" />
    }
    return null;
}

export default RedirectIfLogined;