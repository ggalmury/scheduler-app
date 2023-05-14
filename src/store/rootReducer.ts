import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistConfig from "./PersistConfig";
import AccountSlice from "./slices/AccountSlice";
import DiarySlice from "./slices/DiarySlice";

const rootReducer = combineReducers({
  account: AccountSlice,
  diary: DiarySlice,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
