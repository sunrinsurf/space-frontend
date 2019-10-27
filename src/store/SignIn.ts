import { takeEvery, put, select, call } from 'redux-saga/effects';
import { RootState } from './reducer';
import { getTokenAPI } from '../lib/api/signin';
import { registerToken } from './Auth';
// type declares
const CLEAR_ALL = 'SignIn/CLEAR_ALL' as const;
const CHANGE_FORM = 'SignIn/CHANGE_FORM' as const;
const REQUEST_AUTH = 'SignIn/REQUEST_AUTH' as const;

//saga type declares
const AUTH_DONE = 'SignIn/AUTH_DONE' as const;

// dispatch functions
export function clearALL() {
    return {
        type: CLEAR_ALL
    }
}
export function changeForm(payload: { [key: string]: any }) {
    return {
        type: CHANGE_FORM,
        payload
    }
}
export function requestAuth() {
    return {
        type: REQUEST_AUTH
    }
}
function authDone() {
    return { type: AUTH_DONE }
}

type ActionType = ReturnType<typeof clearALL> | ReturnType<typeof changeForm> | ReturnType<typeof authDone>;

// sagas
function* requestAuthSaga() {
    const { uid, password, remember } = yield select((state: RootState) => state.SignIn.form);
    try {
        const token = yield call(getTokenAPI, uid, password, remember);
        yield put(registerToken({ token }));
        yield put(authDone());
        yield put(clearALL());
    } catch (e) {
        alert(e.message);
    }
}
export function* SignInSaga() {
    yield takeEvery(REQUEST_AUTH, requestAuthSaga);
}

// states
const formInitialState = {
    uid: '',
    password: '',
    remember: false
};
const initialState = {
    form: formInitialState,
    success: false,
};
export type SignInType = typeof initialState;

// reducer
export default function (state = initialState, action: ActionType): SignInType {
    switch (action.type) {
        case CLEAR_ALL:
            return { ...state, form: formInitialState }
        case CHANGE_FORM:
            return { ...state, form: { ...state.form, ...action.payload } }
        case AUTH_DONE:
            return { ...state, success: true };
        default:
            return state;
    }
}