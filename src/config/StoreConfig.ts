import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../store/RootReducer";

const store = configureStore({
  reducer: RootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
});

export default store;
