import { combineReducers } from "redux";
import {authReducer} from "./auth";
import {playersReducer} from "./players";
import {jackpotReducer} from "./jackpot";
import {ringgamesReducer} from "./ringGames";
import {affiliatesReducer} from "./affiliates"


const rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  ringgames: ringgamesReducer,
  jackpot: jackpotReducer,
  affiliates: affiliatesReducer
 
});

export default rootReducer;
