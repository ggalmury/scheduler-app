import { StyleSheet } from "react-native";
import { COLOR_BLACK, COLOR_GREY, COLOR_INDIGO, COLOR_IVORY, COLOR_SKYBLUE, COLOR_TOMATO, COLOR_WHITE } from "../utils/constants/styles";

export const commonBackgroundColor = StyleSheet.create({
  skyblue: {
    backgroundColor: COLOR_SKYBLUE,
  },
  tomato: {
    backgroundColor: COLOR_TOMATO,
  },
  ivory: {
    backgroundColor: COLOR_IVORY,
  },
  white: {
    backgroundColor: COLOR_WHITE,
  },
  black: {
    backgroundColor: COLOR_BLACK,
  },
  indigo: {
    backgroundColor: COLOR_INDIGO,
  },
  grey: {
    backgroundColor: COLOR_GREY,
  },
});

export const commonFontColor = StyleSheet.create({
  skyblue: {
    color: COLOR_SKYBLUE,
  },
  black: {
    color: COLOR_BLACK,
  },
  white: {
    color: COLOR_WHITE,
  },
  grey: {
    color: COLOR_GREY,
  },
});

export const commonPosition = StyleSheet.create({
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
});
