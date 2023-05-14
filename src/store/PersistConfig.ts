import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig } from "redux-persist";
import { RootState } from "./rootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["account"],
};

export default persistConfig;
