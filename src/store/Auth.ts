import { put, takeEvery, call } from "redux-saga/effects";
import Cookies from "js-cookie";

const REGISTER_TOKEN = "Auth/REGISTER_TOKEN" as const;
const REGISTER_TOKEN_SUCCESS = "Auth/REGISTER_TOKEN_SUCCESS" as const;
const UNREGISTER_TOKEN = "Auth/UNREGISTER_TOKEN" as const;
const UNREGISTER_TOKEN_SUCCESS = "Auth/UNREGISTER_TOKEN_SUCCESS" as const;
const CHECK_TOKEN = "Auth/CHECK_TOKEN" as const;
const CHECK_TOKEN_SUCCESS = "Auth/CHECK_TOKEN_SUCCESS" as const;

export function registerToken({ token }: { token: string }) {
  return { type: REGISTER_TOKEN, token };
}
export function unregisterToken() {
  return { type: UNREGISTER_TOKEN };
}
export function checkToken() {
  return {
    type: CHECK_TOKEN
  };
}
function registerToken_success({ token }: { token: string }) {
  return {
    type: REGISTER_TOKEN_SUCCESS,
    token
  };
}
function unregisterToken_success() {
  return {
    type: UNREGISTER_TOKEN_SUCCESS
  };
}

function checkToken_success({ state }: { state: AuthType }) {
  return {
    type: CHECK_TOKEN_SUCCESS,
    state
  };
}
type ActionType =
  | ReturnType<typeof registerToken>
  | ReturnType<typeof registerToken_success>
  | ReturnType<typeof unregisterToken>
  | ReturnType<typeof unregisterToken_success>
  | ReturnType<typeof checkToken>
  | ReturnType<typeof checkToken_success>;

function* registerTokenSaga(action: any) {
  yield call(Cookies.set, "auth_token", action.token);
  yield put(registerToken_success(action.token));
}
function* unregisterTokenSaga() {
  yield call(Cookies.remove, "auth_token");
  yield put(unregisterToken_success());
}
function* checkTokenSaga() {
  const token = Cookies.get("auth_token") || null;
  yield put(
    checkToken_success({
      state: {
        token,
        autorized: !!token
      }
    })
  );
}
export function* AuthSaga() {
  yield takeEvery(REGISTER_TOKEN, registerTokenSaga);
  yield takeEvery(UNREGISTER_TOKEN, unregisterTokenSaga);
  yield takeEvery(CHECK_TOKEN, checkTokenSaga);
}

const token = Cookies.get("auth_token") || null;
const initialState = {
  token,
  autorized: !!token
};
export type AuthType = typeof initialState;

export default function(state = initialState, action: ActionType): AuthType {
  switch (action.type) {
    case REGISTER_TOKEN_SUCCESS:
      return {
        token: action.token,
        autorized: true
      };
    case UNREGISTER_TOKEN_SUCCESS:
      return {
        token: null,
        autorized: false
      };
    case CHECK_TOKEN_SUCCESS:
      return action.state;
    default:
      return state;
  }
}
