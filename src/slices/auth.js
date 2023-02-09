import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";



export const fetchAuth = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await instance.post("auth/login", params);

    return data;
  }
);


export const fetchAuthMe = createAsyncThunk(
  "auth/fetchUserMyData",
  async () => {
    const { data } = await instance.get("auth/me");

    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state)=> {
      state.data = null;
   
    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "error";
    },


    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});


export const selectIsAuth = state => Boolean(state.auth.data);
export const selectIsData = state => state.auth.data;
export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;
