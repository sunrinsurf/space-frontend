const INPUT_CHANGE = "SignUp/INPUT_CHANGE" as const;
const INPUT_CLEAR = `SignUp/INPUT_CLEAR` as const;
const CATEGORY_TOGGLE = "SignUp/CATEGORY_TOGGLE" as const;
interface dataTypes {
  id?: string;
  password?: string;
  password_accept?: string;
  username?: string;
  name?: string;
  phone?: string;
  address?: string;
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
  address: ""
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

export function inputChange(payload: dataTypes) {
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
export function categoryToggle(i: number) {
  return {
    type: CATEGORY_TOGGLE,
    payload: i
  };
}
type SignUpAction =
  | ReturnType<typeof categoryToggle>
  | ReturnType<typeof inputChange>
  | ReturnType<typeof inputClear>;
const initialState = {
  form: initialDataState,
  categorys
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
    default:
      return state;
  }
}

export default SignUp;
