import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects'
import Share, { ShareType, ShareSaga } from './Share';

export type FormsType = {
    Share: ShareType
}
const Forms = combineReducers({
    Share
});

export function* FormsSaga() {
    yield all([
        ShareSaga()
    ])
}

export default Forms;
