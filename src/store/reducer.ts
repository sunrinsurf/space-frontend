import { combineReducers } from "redux";
import SignUp from "./SignUp";

const reducer = combineReducers({
  SignUp
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
