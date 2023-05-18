import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { commonBackgroundColor, commonFontColor, commonPosition } from "../../styles/common";

interface Props {
  name: string;
}

const BtnSubmit = ({ name }: Props): ReactElement => {
  return (
    <TouchableOpacity style={[style.container, commonBackgroundColor.skyblue, commonPosition.centering]}>
      <Text style={[style.buttonName, commonFontColor.white]}>{name}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 50,
  },
  buttonName: {
    fontFamily: "poppinsBold",
    fontSize: 18,
  },
});
export default BtnSubmit;
