import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-gesture-handler";
import RootNavigation from "./src/screens/navigate/RootNavigation";
import store from "./src/config/StoreConfig";
import { injectStore } from "./src/config/AxiosInterceptor";

const persistor = persistStore(store);
injectStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}
