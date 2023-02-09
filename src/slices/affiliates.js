import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const addAffiliates = createAsyncThunk(
  "affiliates/addAffilia",
  async (payload) => {
    const { data } = await instance.post("affiliates/add", payload);
    return data;
  }
);

export const getAllAffiliates = createAsyncThunk(
  "affiliates/getAllAffilia",
  async (payload) => {
    const { data } = await instance.get("affiliates/getallaffilii", payload);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const affiliatesSlice = createSlice({
  name: "affiliates",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllAffiliates.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [getAllAffiliates.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [getAllAffiliates.pending]: (state) => {
      state.data = null;
      state.status = "error";
    },


    [addAffiliates.pending]: (state) => {
      
      state.status = "loading";
    },
    [addAffiliates.fulfilled]: (state) => {
     
      state.status = "loaded";
    },
    [addAffiliates.pending]: (state) => {
      
      state.status = "error";
    },
  },
});

export const getAffiliate = (state) => state.affiliates.data;

export const affiliatesReducer = affiliatesSlice.reducer;
