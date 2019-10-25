import store from "../../../store";
import checkOverlap from "../../../lib/api/checkOverlap";
import { setUsed, setUnunsed } from "../../../store/PhoneCert";
interface matchersInterface {
  [key: string]: (value: string) => (string | boolean)[] | Promise<(string | boolean)[]>;
}
const matchers: matchersInterface = {
  async id(value) {
    if (!value.match(/^[a-z0-9_-]{6,24}$/)) {
      return [
        false,
        "아이디는 6~24글자 영문소문자, 숫자, 하이픈(-), 언더스코어(_)만 허용됩니다."
      ];
    }
    if (await checkOverlap('id', value)) {
      return [
        false,
        "이미 사용 중인 아이디입니다."
      ];
    }
    return [true];
  },
  password(value) {
    if (!value.match(/^[a-zA-Z0-9!@#$%^&*()-_]{8,24}$/)) {
      return [
        false,
        "비밀번호는 8~24글자 영대소문자, 숫자, 일부 특수문자만 허용됩니다."
      ];
    }
    return [true];
  },
  password_accept(value) {
    const {
      SignUp: {
        form: { password }
      }
    } = store.getState();
    if (password !== value) {
      return [false, "비밀번호 확인은 비밀번호와 같아야 합니다."];
    }
    return [true];
  },
  async username(value) {
    if (!value.match(/^[가-힣a-zA-Z0-9-_]{3,}$/)) {
      return [false, "닉네임은 세 글자 이상, 특수문자를 포함해선 안 됩니다."];
    }
    return [true];
  },
  name(value) {
    if (!value.match(/^[가-힣]{2,}$/))
      return [false, "이름은 2글자 이상의 한글이어야 합니다."];
    return [true];
  },
  async email(value) {
    if (!value.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i)) {
      return [false, "이메일 형식에 맞춰 입력해 주세요."];
    }
    if (await checkOverlap('email', value)) {
      return [false, '이미 사용 중인 이메일입니다.'];
    }
    return [true];
  },
  async phone(value) {
    if (await checkOverlap('phone', value)) {
      store.dispatch(setUsed())
      return [false, '이미 사용 중인 전화번호입니다.'];
    }
    store.dispatch(setUnunsed())
    return [true];
  }
};
function SignUpInfoMatch(key: string, value: string) {
  if (value === "") return [true];
  const func = matchers[key];
  if (func) {
    return func(value);
  }
  return [true];
}

export default SignUpInfoMatch;
