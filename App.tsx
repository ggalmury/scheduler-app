import "react-native-gesture-handler";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./src/store/RootReducer";
import RootNavigation from "./src/screens/navigate/RootNavigation";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
