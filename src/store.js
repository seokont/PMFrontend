import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { pick } from "lodash";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas";
// import { loadAppState, saveAppState } from "./shared/utils/helpers";
import rootReducer from "./slices";

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
//   preloadedState: loadAppState(),
  reducer: rootReducer,
  // middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
  // devTools: process.env.NODE_ENV !== "production"
});

// store.subscribe(() => {
//   saveAppState(pick(store.getState(), ["auth"]));
// });

// sagaMiddleware.run(rootSaga);

export default store;
