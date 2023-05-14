import { StyleSheet, Text, View } from "react-native";
import { configureStore } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import rootReducer from "./src/store/rootReducer";
import { PersistGate } from "redux-persist/integration/react";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
