// import { call, put, all, takeLatest } from "redux-saga/effects";
// import jwt_decode from "jwt-decode";
// import {
//   loginSuccess,
//   loginError,
//   //   logoutSuccess,
//   //   registerSuccess,
//   //   registerError,
//   login,
//   myDataSuccess,
//   myData
//   //   logout,
//   //   registerRequest,
//   //   forgotPasswordRequest,
//   //   forgotPasswordSuccess,
//   //   forgotPasswordError,
// } from "../slices/auth";

// // import { getProfileRequest } from '../slices/user';

// // import { toastConfig } from '../shared/defaultValue';
// // import accountService from '../services/Account';
// import AuthAPI from "../services/UserAPI";

// // import toast from 'react-hot-toast';
// // import { resetState } from 'slices/searchGameSession';

// function* loginUser({ payload }) {
//   try {
//     const result = yield call(AuthAPI.loginApi, payload);
//     if (result.status === 200) {
//       // localStorage.setItem('token', result.data.token);
//       //   yield put(resetState());
//       yield put(loginSuccess(result.data.token));
//       //   yield put(getProfileRequest());
//     } else {
//       //   toast.error(result.message, toastConfig);
//       yield put(loginError(result.message));
//     }
//   } catch (error) {
//     // toast.error(error.message, toastConfig);
//     yield put(loginError(error.message));
//   }
// }


// function* myAccount({ payload }) {
//   try {
//     const result = yield call(AuthAPI.getMe);
//     if (result.status === 200) {
     
//       //   yield put(resetState());
//       yield put(myDataSuccess(result.data.token));
//       //   yield put(getProfileRequest());
//     } else {
//       //   toast.error(result.message, toastConfig);
//       yield put(loginError(result.message));
//     }
//   } catch (error) {
//     // toast.error(error.message, toastConfig);
//     yield put(loginError(error.message));
//   }
// }

// // function* signUpUser({ payload }) {
// //   try {
// //     const result = yield call(accountService.register, payload);
// //     if (result.success) {
// //       yield put(registerSuccess(true));
// //       yield put(
// //         login({
// //           email: payload?.email,
// //           password: payload?.password
// //         })
// //       );
// //       toast.success('Account register successfull', toastConfig);
// //       setTimeout(() => {
// //         let appState = JSON.parse(window.localStorage.getItem('frisson_state'));
// //         const decode = jwt_decode(appState.auth.currentUser);
// //         window.dataLayer = window.dataLayer || [];
// //         window.dataLayer.push({
// //           'event': 'newAccountSignUpFan',
// //           'playfabId': decode?.playFabId
// //         });

// //         //add new object for tutorial state
// //         let tutorialState = {
// //           "dressing-room" : true,
// //           "store" : true,
// //           "atm" : true,
// //           "crowd-chat" : true
// //         }
// //         localStorage.setItem("frisson_tutorial", JSON.stringify(tutorialState))

// //       }, 3000);
// //     } else {
// //       toast.error(result.message, toastConfig);
// //       yield put(registerError(result.message));
// //     }
// //   } catch (error) {
// //     toast.error(error.message, toastConfig);
// //     yield put(registerError(error.message));
// //   }
// // }

// // function* forgotPasswordUser({ payload }) {
// //   try {
// //     const result = yield call(accountService.forgotPassword, payload);
// //     if (result?.success) {
// //       yield put(forgotPasswordSuccess());
// //       toast.success('Please check email to change password', toastConfig);
// //     } else {
// //       toast.error(result.message, toastConfig);
// //       yield put(registerError(result.message));
// //     }
// //   } catch (error) {
// //     toast.error(error.message, toastConfig);
// //     yield put(forgotPasswordError(error.message));
// //   }
// // }

// // // Remove the access token cookie from Express
// // function* logoutUser() {
// //   yield call(userService.updateUserShowConnection, {
// //     showId: '-1',
// //     disconnect: true
// //   });
// //   localStorage.removeItem('frisson_state');
// //   yield put(resetState());
// //   yield put(logoutSuccess());
// // }

// export function* authSaga() {
//   yield all([
//     takeLatest(login.type, loginUser),
//     takeLatest(myData.type, myAccount),
//     // takeLatest(logout.type, logoutUser),
//     // takeLatest(registerRequest.type, signUpUser),
//     // takeLatest(forgotPasswordRequest.type, forgotPasswordUser),
//   ]);
// }
