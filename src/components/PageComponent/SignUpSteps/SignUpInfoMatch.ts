interface matchersInterface {
    [key: string]: (value: string) => (string | boolean)[]
}
const matchers: matchersInterface = {
    name(value: string) {
        if (!value.match(/^[가-힣]{2,}$/))
            return [false, "이름은 2글자 이상의 한글이어야 합니다."];
        return [true];
    }
}
function SignUpInfoMatch(key: string, value: string) {
    const func = matchers[key];
    if (func) {
        return func(value);
    }
    return [true];
}

export default SignUpInfoMatch;