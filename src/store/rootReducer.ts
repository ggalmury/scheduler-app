import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import persistConfig from "./PersistConfig";
import NoteSlice from "./slices/NoteSlice";
import MemberSlice from "./slices/MemberSlice";

const rootReducer = combineReducers({
  member: MemberSlice,
  note: NoteSlice,
});

export default persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
