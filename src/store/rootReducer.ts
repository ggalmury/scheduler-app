import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistConfig from "./PersistConfig";
import NoteSlice from "./slices/NoteSlice";
import AccountSlice from "./slices/AccountSlice";

const rootReducer = combineReducers({
  account: AccountSlice,
  note: NoteSlice,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
