import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import SignUp, { SignUpType, SignUpSaga } from "./SignUp";
import PhoneCert, { PhoneCertType, PhoneCertSaga } from "./PhoneCert";
import SignIn, { SignInType, SignInSaga } from "./SignIn";
import Auth, { AuthType, AuthSaga } from "./Auth";
import Categorys, { CategorysType } from "./Categorys";
import Forms, { FormsType, FormsSaga } from "./forms";
import Chat, { ChatType, ChatSaga } from "./Chat";
import Socket, { SocketType, SocketSaga } from "./Socket";

export type RootState = {
  SignUp: SignUpType;
  PhoneCert: PhoneCertType;
  SignIn: SignInType;
  Auth: AuthType;
  Categorys: CategorysType;
  Forms: FormsType;
  Chat: ChatType;
  Socket: SocketType;
};

const reducer = combineReducers({
  PhoneCert,
  SignUp,
  SignIn,
  Auth,
  Categorys,
  Forms,
  Chat,
  Socket
});

export function* rootSaga() {
  yield all([
    PhoneCertSaga(),
    SignUpSaga(),
    SignInSaga(),
    AuthSaga(),
    FormsSaga(),
    ChatSaga(),
    SocketSaga()
  ]);
}
export default reducer;
