import { select, call, put, takeEvery } from "redux-saga/effects";
import { RootState } from "./reducer";
import { phoneCertAPI, phoneCertVerify } from "../lib/api/signup";
import { handleSagaError } from "../lib/api/handleError";
import sagaType from "../lib/sagaType";
import { certTokenComplete } from "./SignUp";
import { AnyAction } from 'redux'

const [
  REQUEST_PHONE_CERT,
  REQUEST_PHONE_CERT_SUCCESS,
  REQUEST_PHONE_CERT_FAIL
] = sagaType("PhoneCert/REQUEST_PHONE_CERT" as const);
const VERIFY_TOKEN_SUCCESS = "PhoneCert/VERIFY_TOKEN_SUCCESS" as const;
const VERIFY_TOKEN = "PhoneCert/VERIFY_TOKEN" as const;
const SET_USED = "PhoneCert/SET_USED" as const;
const SET_UNUSED = "PhoneCert/SET_UNUSED" as const;

interface requestPhoneCertReturnType {
  type: string;
  payload: {
    token: string;
  };
}
function* requestPhoneCertSaga() {
  try {
    const { phone, canCert } = yield select((state: RootState) => ({ phone: state.SignUp.form.phone, canCert: state.PhoneCert.canCert }));
    if (!canCert) {
      alert("중복된 전화번호입니다.");
    } else {
      const res = yield call(phoneCertAPI, phone);
      const action: requestPhoneCertReturnType = {
        type: REQUEST_PHONE_CERT_SUCCESS,
        payload: { token: res.data.token }
      };

      yield put(action);
    }
  } catch (e) {
    yield handleSagaError(e, REQUEST_PHONE_CERT_FAIL);
  }
}
function* verifyTokenSaga({ payload: { code } }: AnyAction) {
  const phone = yield select((state: RootState) => state.SignUp.form.phone);
  const token = yield select((state: RootState) => state.PhoneCert.token);

  const res = yield call(phoneCertVerify, phone, code, token);

  yield put(certTokenComplete(res.data.token));
  yield put({ type: VERIFY_TOKEN_SUCCESS });

}
export function requestPhone() {
  return {
    type: REQUEST_PHONE_CERT
  };
}
export function setUsed() {
  return {
    type: SET_USED
  }
}
export function setUnunsed() {
  return {
    type: SET_UNUSED
  }
}
export function verifyToken(code: string) {
  return {
    type: VERIFY_TOKEN,
    payload: { code }
  }
}

export function* PhoneCertSaga() {
  yield takeEvery(VERIFY_TOKEN, verifyTokenSaga);
  yield takeEvery(REQUEST_PHONE_CERT, requestPhoneCertSaga);
}


type actionType = requestPhoneCertReturnType;

const initialState: PhoneCertType = {
  progress: false,
  token: '',
  success: false,
  canCert: true
}
export type PhoneCertType = {
  progress: boolean,
  token?: string,
  success: boolean
  canCert: boolean
};

function PhoneCert(state: PhoneCertType = initialState, action: actionType): PhoneCertType {
  switch (action.type) {
    case REQUEST_PHONE_CERT_SUCCESS:
      return {
        ...state,
        progress: true,
        token: action.payload.token
      }
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        success: true,
        progress: false,
      }
    case SET_USED:
      return {
        ...state,
        canCert: false
      }
    case SET_UNUSED:
      return {
        ...state,
        canCert: true
      }
    default: return state;
  }
}

export default PhoneCert;