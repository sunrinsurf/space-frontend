import sagaType from "../lib/sagaType";
import { takeEvery, put, call, select } from 'redux-saga/effects'
import { RootState } from "./reducer";
import { signUpCompleteAPI } from "../lib/api/signup";
import { handleSagaError } from '../lib/api/handleError'

const INPUT_CHANGE = "SignUp/INPUT_CHANGE" as const;
const INPUT_CLEAR = `SignUp/INPUT_CLEAR` as const;
const SET_PAGE = "SignUp/SET_PAGE" as const;
const CATEGORY_TOGGLE = "SignUp/CATEGORY_TOGGLE" as const;
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
const categorys: category[] = [
  { name: "자전거" },
  { name: "교통수단" },
  { name: "장소/공간" },
  { name: "구독 서비스" },
  { name: "가전제품" },
  { name: "모바일/컴퓨터" },
  { name: "기타" }
];

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
  | ReturnType<typeof inputChange>
  | ReturnType<typeof inputClear>
  | ReturnType<typeof inputError>
  | ReturnType<typeof inputErrorClear>
  | ReturnType<typeof setPage>
  | ReturnType<typeof certTokenComplete>
  | any;

function* signUpCompleteSaga() {
  try {
    const { form, categorys, certToken } = yield select((state: RootState) => ({ form: state.SignUp.form, categorys: state.SignUp.categorys, certToken: state.SignUp.certToken }));
    yield call(signUpCompleteAPI, {
      uid: form.id || '',
      password: form.password || '',
      address: form.address || '',
      nickname: form.username || '',
      phone: form.phone,
      email: form.email || '',
      ptoken: certToken || '',
      interest: categorys.filter((data: any) => data.checked).map((data: any) => data.name)
    });
    yield put({ type: SIGNUP_COMPLETE_SUCCESS });
  } catch (e) {
    yield handleSagaError(e, SIGNUP_COMPLETE_FAIL);
  }
}
export function* SignUpSaga() {
  yield takeEvery(SIGNUP_COMPLETE, signUpCompleteSaga);
}
const initialState = {
  success: false,
  sign_error: null,
  form: initialDataState,
  error: initialDataErrorState,
  categorys,
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
    case CATEGORY_TOGGLE:
      const categorys = [...state.categorys];
      categorys[action.payload].checked = !categorys[action.payload].checked;

      return {
        ...state,
        categorys
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
