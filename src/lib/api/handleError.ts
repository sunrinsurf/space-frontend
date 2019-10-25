import { put } from "redux-saga/effects";

async function handleError(handler: () => Promise<any> | any) {
  try {
    return await Promise.resolve(handler());
  } catch (e) {
    if (e.response && e.response.data && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    throw e;
  }
}
export function* handleSagaError(e: any, errorType: string) {
  yield put({ type: errorType, payload: e });
}
export default handleError;
