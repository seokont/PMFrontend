import { all } from "redux-saga/effects";
import { authSaga } from "./auth";


// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([
    authSaga(),
   
  ]);
}

export default rootSaga;
