import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import SignUp, { SignUpType, SignUpSaga } from "./SignUp";
import PhoneCert, { PhoneCertType, PhoneCertSaga } from './PhoneCert';
import SignIn, { SignInType, SignInSaga } from "./SignIn";
import Auth, { AuthType, AuthSaga } from './Auth';

export type RootState = {
  SignUp: SignUpType,
  PhoneCert: PhoneCertType,
  SignIn: SignInType,
  Auth: AuthType
};

const reducer = combineReducers({
  PhoneCert,
  SignUp,
  SignIn,
  Auth
});

export function* rootSaga() {
  yield all([PhoneCertSaga(), SignUpSaga(), SignInSaga(), AuthSaga()]);
}
export default reducer;
