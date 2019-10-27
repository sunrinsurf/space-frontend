import createStore from './createStore';

const store = createStore((window as any).__PRELOAD_STATE__ || {});
export default store;