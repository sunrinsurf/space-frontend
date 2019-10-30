import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import SignUp, { SignUpType, SignUpSaga } from "./SignUp";
import PhoneCert, { PhoneCertType, PhoneCertSaga } from './PhoneCert';
import SignIn, { SignInType, SignInSaga } from "./SignIn";
import Auth, { AuthType, AuthSaga } from './Auth';
import Categorys, { CategorysType } from "./Categorys";
import Forms, { FormsType, FormsSaga } from './forms';

export type RootState = {
  SignUp: SignUpType,
  PhoneCert: PhoneCertType,
  SignIn: SignInType,
  Auth: AuthType,
  Categorys: CategorysType,
  Forms: FormsType
};

const reducer = combineReducers({
  PhoneCert,
  SignUp,
  SignIn,
  Auth,
  Categorys,
  Forms
});

export function* rootSaga() {
  yield all([PhoneCertSaga(), SignUpSaga(), SignInSaga(), AuthSaga(), FormsSaga()]);
}
export default reducer;
