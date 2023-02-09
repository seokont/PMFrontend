import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const fetchJackpot = createAsyncThunk(
  "jackpot/fetchjackpot",
  async () => {
    const { data } = await instance.get("jackpot/alljackpot");
    return data;
  }
);

export const fetchEditJackpot = createAsyncThunk(
  "jackpot/fetchEditjackpot",
  async (payload) => {
    const { data } = await instance.put(`jackpot/${payload._id}`, payload);
    return data;
  }
);

export const fetchCreateJackpot = createAsyncThunk(
  "jackpot/fetchCreatejackpot",
  async (payload) => {
    const { data } = await instance.post("jackpot/createjackpot", payload);
    return data;
  }
);


export const fetchDeleteJackpot = createAsyncThunk(
  "jackpot/fetchDeletejackpot",
  async (payload) => {
    const { data } = await instance.delete(`jackpot/${payload._id}`);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
  statuscreate:"",
  statusdelete:""
};

const jackpotSlice = createSlice({
  name: "jackpot",
  initialState,
  reducers: {
    editJackpotRP: (state, payload) => {      
      state.data.result = [
        ...state.data.result
      ].map((i) => {
        if (payload.payload.id === i._id) {
        return { ...i, rakePercent: Number(payload.payload.rake)}
        } else return i;
      });
    },
    editJackpotA: (state, payload) => {      
      state.data.result = [
        ...state.data.result
      ].map((i) => {
        if (payload.payload.id === i._id) {
        return { ...i, initialAmount: Number(payload.payload.amount)}
        } else return i;
      });
    },


    editJackpotGamesArray: (state, payload) => { 
          
      state.data.result = [
        ...state.data.result
      ].map((i) => {
        if (payload.payload.id === i._id) {
        return { ...i, games: payload.payload.games}
        } else return i;
      });
    },
    editJackpotBJCheked: (state, payload) => {      
      state.data.result = [
        ...state.data.result
      ].map((i) => {
        if (payload.payload.id === i._id) {
        return { ...i, badBeatJackpot: Number(payload.payload.checked)}
        } else return i;
      });
    },

    createJackpotBJCheked: (state) => {      
      state.data.result = [
        ...state.data.result, {
          games:[],
          rakePercent:0,
          initialAmount:0,
          badBeatJackpot: 1,
          _id:'505'
        }
      ]
    },
  },
  extraReducers: {

    [fetchDeleteJackpot.pending]: (state) => {    
      state.statusdelete = "loading";
    },
    [fetchDeleteJackpot.fulfilled]: (state) => {    
      state.statusdelete = "loaded";
    },
    [fetchDeleteJackpot.pending]: (state) => {     
      state.statusdelete = "error";
    },



    [fetchCreateJackpot.pending]: (state) => {    
      state.statuscreate = "loading";
    },
    [fetchCreateJackpot.fulfilled]: (state) => {    
      state.statuscreate = "loaded";
    },
    [fetchCreateJackpot.pending]: (state) => {     
      state.statuscreate = "error";
    },



    [fetchEditJackpot.pending]: (state) => {    
      state.status = "loading";
    },
    [fetchEditJackpot.fulfilled]: (state) => {    
      state.status = "loaded";
    },
    [fetchEditJackpot.pending]: (state) => {     
      state.status = "error";
    },



    [fetchJackpot.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchJackpot.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchJackpot.pending]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const deleteJackpotsstatus = (state) => state.jackpot.statusdelete;
export const createJackpotsstatus = (state) => state.jackpot.statuscreate;
export const getJackpots = (state) => state.jackpot.data;
export const jackpotReducer = jackpotSlice.reducer;

export const { editJackpotRP, editJackpotA, editJackpotBJCheked, createJackpotBJCheked, editJackpotGamesArray } = jackpotSlice.actions;
