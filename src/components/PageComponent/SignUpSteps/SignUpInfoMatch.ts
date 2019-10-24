import store from "../../../store";
interface matchersInterface {
  [key: string]: (value: string) => (string | boolean)[];
}
const matchers: matchersInterface = {
  id(value) {
    if (!value.match(/^[a-z0-9_-]{6,24}$/)) {
      return [
        false,
        "아이디는 6~24글자 영문소문자, 숫자, 하이픈(-), 언더스코어(_)만 허용됩니다."
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
  username(value) {
    if (!value.match(/^[가-힣a-zA-Z0-9-_]{3,}$/)) {
      return [false, "닉네임은 세 글자 이상, 특수문자를 포함해선 안 됩니다."];
    }
    return [true];
  },
  name(value) {
    if (!value.match(/^[가-힣]{2,}$/))
      return [false, "이름은 2글자 이상의 한글이어야 합니다."];
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
