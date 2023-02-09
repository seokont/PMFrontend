import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currentUser: undefined,
  isAuthenticated: false,
  isSignUp: false,
  error: "",
  loading: false,
  success: false,
  isRole: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadGuestSession: (state) => {
      return {
        ...state,
        loading: false
      };
    },

    loadGuestSessionSuccess: (state, { payload }) => {
      return {
        ...state,
        currentUser: payload,
        loading: false,
        success: true,
        callAPI: true
      };
    },

    loadGuestSessionError: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        loading: false,
        success: false
      };
    },

    login: (state, { payload }) => {
       
      return {
        ...state,
        loading: true
      };
    },

    loginSuccess: (state, { payload }) => {
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loading: false,
        isRole: true,
        success: true
      };
    },

    loginError: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
        success: false
      };
    },




    myData: (state, { payload }) => {
       
      return {
        ...state,
        loading: true
      };
    },

    myDataSuccess: (state, { payload }) => {
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loading: false,
        isRole: true,
        success: true
      };
    },

    myDataError: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
        success: false
      };
    },




    logout: (state) => {
      return {
        ...state,
        loading: true
      };
    },

    logoutSuccess: (state) => {
      return {
        ...state,
        currentUser: undefined,
        error: "",
        isAuthenticated: false,
        loading: false,
        success: false
      };
    },
    registerRequest: (state, { payload }) => {
      return {
        ...state,
        loading: true
      };
    },

    registerSuccess: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        isSignUp: payload,
        success: true
      };
    },

    registerError: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        loading: false,
        success: false
      };
    },
    forgotPasswordRequest: (state, { payload }) => {
      return {
        ...state,
        loading: true
      };
    },

    forgotPasswordSuccess: (state) => {
      return {
        ...state,
        loading: false,
        success: true
      };
    },

    forgotPasswordError: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        loading: false,
        success: false
      };
    },
    navigateSchedule: (state) => {
      return {
        ...state,
        isRole: false
      };
    },
    resetState: () => {
      return { ...initialState }
    }
  }
});
export const selectIsAuth = state => state.auth
export const {
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
  registerRequest,
  registerSuccess,
  registerError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetState,
  navigateSchedule,
  loadGuestSession,
  loadGuestSessionSuccess,
  loadGuestSessionError,
  myData,
  myDataSuccess,
  myDataError
} = authSlice.actions;


export default authSlice.reducer;
