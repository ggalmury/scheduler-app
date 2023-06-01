import { StyleSheet } from "react-native";
import { COLOR_INDIGO } from "../utils/constants/Styles";

export const commonInput = StyleSheet.create({
  authContainer: {
    flexDirection: "row",
    height: 55,
    borderRadius: 25,
  },
  taskCreatorContainer: {
    flexDirection: "row",
    height: 55,
    borderRadius: 10,
    borderColor: COLOR_INDIGO,
    borderWidth: 1.5,
  },
});
