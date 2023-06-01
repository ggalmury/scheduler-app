import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { commonPosition } from "../../styles/Common";

interface Props {
  name: string;
  backgroundColor: string;
  color: string;
  width: number;
  onPress: () => void;
}

const BtnSubmit = ({ name, backgroundColor, color, width, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity style={[style.container, commonPosition.centering, { backgroundColor, width }]} onPress={onPress}>
      <Text style={[style.buttonName, { color }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 10,
  },
  buttonName: {
    fontFamily: "poppinsBold",
    fontSize: 14,
  },
});
export default BtnSubmit;
