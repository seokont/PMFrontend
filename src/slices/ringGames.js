import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const fetchRingGames = createAsyncThunk(
  "ringgame/fetchRingGames",
  async () => {
    const { data } = await instance.get("ringgames/all");
    return data;
  }
);

export const fetchRingGamesMessages = createAsyncThunk(
  "ringgame/fetchRingGamesMessage",
  async (payload) => {
    const { data } = await instance.post("ringgames/messages", payload);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
  messagesStatus: "",
};

const ringgamesSlice = createSlice({
  name: "ringgames",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRingGamesMessages.pending]: (state) => {
      state.messagesStatus = "loading";
    },
    [fetchRingGamesMessages.fulfilled]: (state) => {
      state.messagesStatus = "loaded";
    },
    [fetchRingGamesMessages.pending]: (state) => {
      state.messagesStatus = "error";
    },

    [fetchRingGames.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRingGames.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRingGames.pending]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const getRingGames = (state) => state.ringgames.data;
export const statusMessage = (state) => state.ringgames.messagesStatus;

export const ringgamesReducer = ringgamesSlice.reducer;
