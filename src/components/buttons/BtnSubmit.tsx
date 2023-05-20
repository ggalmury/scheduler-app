import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { commonBackgroundColor, commonFontColor, commonPosition } from "../../styles/common";

interface Props {
  name: string;
  backgroundColor: string;
  color: string;
  onPress: () => void;
}

const BtnSubmit = ({ name, backgroundColor, color, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity style={[style.container, commonPosition.centering, { backgroundColor }]} onPress={onPress}>
      <Text style={[style.buttonName, { color }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 250,
    height: 45,
    borderRadius: 10,
  },
  buttonName: {
    fontFamily: "poppinsBold",
    fontSize: 14,
  },
});
export default BtnSubmit;
