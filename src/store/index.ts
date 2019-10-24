import { createStore } from "redux";
import reducer from "./reducer";

const devTool = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducer, devTool && devTool());

export default store;
