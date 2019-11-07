import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { authLogout } from '../../store/Auth';

function LogoutMenu() {
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(authLogout());
    }, [dispatch]);
    return (
        <div style={{ cursor: 'pointer', display: 'inline' }} role="button" onClick={onLogout}>
            Log out
        </div>
    )
}

export default LogoutMenu;