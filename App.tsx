import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import moment from "moment";
import "moment/locale/ko";
import "react-native-gesture-handler";
import rootReducer from "./src/store/RootReducer";
import RootNavigation from "./src/screens/navigate/RootNavigation";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  moment.locale("ko");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
