import { StyleSheet } from "react-native";
import { COLOR_BEIGE, COLOR_BLACK, COLOR_DARKGREY, COLOR_DEFAULT, COLOR_GREY, COLOR_INDIGO, COLOR_IVORY, COLOR_SKYBLUE, COLOR_TOMATO, COLOR_WHITE } from "../utils/constants/Styles";

export const commonBackgroundColor = StyleSheet.create({
  default: {
    backgroundColor: COLOR_DEFAULT,
  },
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
  beige: {
    backgroundColor: COLOR_BEIGE,
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
  tomato: {
    color: COLOR_TOMATO,
  },
  darkgrey: {
    color: COLOR_DARKGREY,
  },
});

export const commonPosition = StyleSheet.create({
  centering: {
    alignItems: "center",
    justifyContent: "center",
  },
});
