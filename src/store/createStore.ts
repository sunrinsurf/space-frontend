import { createStore, compose, applyMiddleware, Store } from "redux";
import reducer, { rootSaga, RootState } from "./reducer";
import createSagaMiddleware from "redux-saga";
function createAppStore(preloadState = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store: Store<RootState> = createStore(reducer, preloadState, devTool(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(rootSaga);
    return store;
}

export default createAppStore;
