import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistConfig from "../config/PersistConfig";
import MemberSlice from "./slices/MemberSlice";
import TaskSlice from "./slices/TaskSlice";

const rootReducer = combineReducers({
  member: MemberSlice,
  task: TaskSlice,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
