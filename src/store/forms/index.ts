import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import Share, { ShareType, ShareSaga } from "./Share";
import SearchShare, { SearchShareType } from "./SearchShare";

export type FormsType = {
  Share: ShareType;
  SearchShare: SearchShareType;
};
const Forms = combineReducers({
  Share,
  SearchShare
});

export function* FormsSaga() {
  yield all([ShareSaga()]);
}

export default Forms;
