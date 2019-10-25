import { createStore, compose, applyMiddleware, Store } from "redux";
import reducer, { rootSaga, RootState } from "./reducer";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();
const devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<RootState> = createStore(reducer, devTool(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
