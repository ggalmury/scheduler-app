import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig } from "redux-persist";
import { RootState } from "../store/RootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["member"],
};

export default persistConfig;
