import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import SignUp, { SignUpType, SignUpSaga } from "./SignUp";
import PhoneCert, { PhoneCertType, PhoneCertSaga } from './PhoneCert';

export type RootState = {
  SignUp: SignUpType,
  PhoneCert: PhoneCertType
};

const reducer = combineReducers({
  PhoneCert,
  SignUp,
});

export function* rootSaga() {
  yield all([PhoneCertSaga(), SignUpSaga()]);
}
export default reducer;
