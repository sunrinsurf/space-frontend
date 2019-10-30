import sagaType from "../lib/sagaType";
import { takeEvery, put, call, select } from 'redux-saga/effects'
import { RootState } from "./reducer";
import { signUpCompleteAPI } from "../lib/api/signup";
import { handleSagaError } from '../lib/api/handleError'

const INPUT_CHANGE = "SignUp/INPUT_CHANGE" as const;
const INPUT_CLEAR = `SignUp/INPUT_CLEAR` as const;
const SET_PAGE = "SignUp/SET_PAGE" as const;
const CATEGORY_TOGGLE = "SignUp/CATEGORY_TOGGLE" as const;
const CATEGORY_TOGGLE_DONE = "SignUp/CATEGORY_TOGGLE_DONE" as const;
const INPUT_ERROR = "SignUp/INPUT_ERROR" as const;
const INPUT_ERROR_CLEAR = "SignUp/INPUT_ERROR_CLEAR" as const;
const CERT_TOKEN_COMPLETE = 'SignUp/CERT_TOKEN_COMPLETE' as const;
const [SIGNUP_COMPLETE, SIGNUP_COMPLETE_SUCCESS, SIGNUP_COMPLETE_FAIL] = sagaType("SignUp/SIGNUP_COMPLETE");

interface dataTypes {
  id: string;
  password: string;
  password_accept: string;
  username: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}
interface category {
  name: string;
  checked?: boolean;
}

const initialDataState: dataTypes = {
  id: "",
  password: "",
  password_accept: "",
  username: "",
  name: "",
  phone: "",
  address: "",
  email: ""
};
const initialDataErrorState: dataTypes = {
  id: "",
  password: "",
  password_accept: "",
  username: "",
  name: "",
  phone: "",
  address: "",
  email: ""
};

export function inputChange(payload: any) {
  return {
    type: INPUT_CHANGE,
    payload
  };
}
export function inputClear() {
  return {
    type: INPUT_CLEAR
  };
}
export function setPage(i: number) {
  return {
    type: SET_PAGE,
    payload: i
  };
}
export function categoryToggle(i: number) {
  return {
    type: CATEGORY_TOGGLE,
    payload: i
  };
}
function categoryToggleDone(categorys: boolean[]) {
  return {
    type: CATEGORY_TOGGLE_DONE,
    payload: categorys
  }
}
export function inputError(payload: { [key: string]: string }) {
  return {
    type: INPUT_ERROR,
    payload
  };
}
export function inputErrorClear(payload: string[]) {
  return {
    type: INPUT_ERROR_CLEAR,
    payload
  };
}
export function certTokenComplete(token: string) {
  return {
    type: CERT_TOKEN_COMPLETE,
    payload: {
      token
    }
  }
}
export function signUpComplete() {
  return {
    type: SIGNUP_COMPLETE
  }
}

type SignUpAction =
  | ReturnType<typeof categoryToggle>
  | ReturnType<typeof categoryToggleDone>
  | ReturnType<typeof inputChange>
  | ReturnType<typeof inputClear>
  | ReturnType<typeof inputError>
  | ReturnType<typeof inputErrorClear>
  | ReturnType<typeof setPage>
  | ReturnType<typeof certTokenComplete>
  | any;

function* signUpCompleteSaga() {
  try {
    const { form, categorys, categorysOn, certToken } = yield select((state: RootState) => ({
      form: state.SignUp.form,
      categorysOn: state.SignUp.categorysOn,
      categorys: state.Categorys.categorys,
      certToken: state.SignUp.certToken
    }));
    const interest = (categorys as string[]).filter((_, i) => {
      if (!categorysOn) return false;
      return categorysOn[i];
    });
    yield call(signUpCompleteAPI, {
      uid: form.id || '',
      password: form.password || '',
      address: form.address || '',
      nickname: form.username || '',
      phone: form.phone,
      email: form.email || '',
      ptoken: certToken || '',
      interest
    });
    yield put({ type: SIGNUP_COMPLETE_SUCCESS });
  } catch (e) {
    yield handleSagaError(e, SIGNUP_COMPLETE_FAIL);
  }
}
function* categoryToggleSaga({ payload }: { payload: number }) {
  const { categorys, categorysOn } = yield select((state: RootState) => ({
    categorys: state.Categorys.categorys,
    categorysOn: state.SignUp.categorysOn
  }));
  if (categorysOn) {
    categorysOn[payload] = !categorysOn[payload];
    yield put(categoryToggleDone(categorysOn));
  } else {
    const bools = [];
    categorys.forEach(() => { bools.push(false) });
    bools[payload] = true;
    yield put(categoryToggleDone(bools));
  }

}
export function* SignUpSaga() {
  yield takeEvery(SIGNUP_COMPLETE, signUpCompleteSaga);
  yield takeEvery((CATEGORY_TOGGLE as any), categoryToggleSaga);
}
const initialState = {
  success: false,
  sign_error: null,
  form: initialDataState,
  error: initialDataErrorState,
  categorysOn: [],
  page: 0,
  certToken: ''
};

function SignUp(state = initialState, action: SignUpAction) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      };
    case INPUT_CLEAR:
      return {
        ...state,
        form: initialDataState
      };
    case CATEGORY_TOGGLE_DONE:
      return {
        ...state,
        categorysOn: action.payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case INPUT_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          ...action.payload
        }
      };
    case INPUT_ERROR_CLEAR:
      const error: { [key: string]: string | undefined } = { ...state.error };
      action.payload &&
        action.payload.forEach((key: any) => {
          error[key] = "";
        });
      return {
        ...state,
        error
      };
    case CERT_TOKEN_COMPLETE:
      return {
        ...state,
        certToken: action.payload.token
      }
    case SIGNUP_COMPLETE_SUCCESS:
      return {
        ...state,
        success: true
      }
    case SIGNUP_COMPLETE_FAIL:
      return {
        ...state,
        success: false,
        sign_error: action.payload.message
      }
    default:
      return state;
  }
}
export type SignUpType = typeof initialState;

export default SignUp;
