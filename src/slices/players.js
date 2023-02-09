import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const fetchPlayers = createAsyncThunk(
  "player/fetchPlayersData",
  async () => {
    const { data } = await instance.get("auth/allplayers");
    return data;
  }
);

export const decrementPlayerId = createAsyncThunk(
  "player/decrementPlayersIdData",
  async (payload) => {
    const { data } = await instance.post("player/decrementplayerid", payload);
    return data;
  }
);

export const editPlayerId = createAsyncThunk(
  "player/editPlayerIdData",
  async (payload) => {
    const { data } = await instance.post("player/playeredit", payload);
    return data;
  }
);

export const deletePlayerId = createAsyncThunk(
  "player/deletePlayerIdData",
  async (payload) => {
    const { data } = await instance.delete(`player/${payload.id}`, payload);
    return data;
  }
);

export const updatePlayer = createAsyncThunk(
  "player/updatePlayers",
  async () => {
    const { data } = await instance.get("player/update");
    return data;
  }
);


const initialState = {
  data: null,
  status: "loading",
  sendingMoneyStatus: "",
  statusDelete: "",
  statusEdit: "",
  statusUpdate:""

};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
   
  },
  extraReducers: {
    [fetchPlayers.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchPlayers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchPlayers.pending]: (state) => {
      state.data = null;
      state.status = "error";
    },



    [updatePlayer.pending]: (state) => {
     
      state.statusUpdate = "loading";
    },
    [updatePlayer.fulfilled]: (state) => {
      
      state.statusUpdate = "loaded";
    },
    [updatePlayer.pending]: (state) => {
    
      state.statusUpdate = "error";
    },



    [deletePlayerId.pending]: (state) => {
     
      state.statusDelete = "loading";
    },
    [deletePlayerId.fulfilled]: (state) => {
      
      state.statusDelete = "loaded";
    },
    [deletePlayerId.pending]: (state) => {
    
      state.statusDelete = "error";
    },


    [editPlayerId.pending]: (state) => {
     
      state.statusEdit = "loading";
    },
    [editPlayerId.fulfilled]: (state) => {
      
      state.statusEdit = "loaded";
    },
    [editPlayerId.pending]: (state) => {
    
      state.statusEdit = "error";
    },



    [decrementPlayerId.pending]: (state) => {
     
      state.sendingMoneyStatus = "loading";
    },
    [decrementPlayerId.fulfilled]: (state) => {
     
      state.sendingMoneyStatus = "loaded";
    },
    [decrementPlayerId.pending]: (state) => {
      
      state.sendingMoneyStatus = "error";
    },
  },
});

export const getPlayers = state => state.players.data;
export const sendMoneyStatus = state => state.players.sendingMoneyStatus;
export const esditStatus = state => state.players.statusEdit;
export const deleteStatus = state => state.players.statusDelete;
export const updateStatus = state => state.players.statusUpdate;


export const playersReducer = playersSlice.reducer;
