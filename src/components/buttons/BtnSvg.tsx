import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

interface Props {
  xml: string;
  onPress: () => void;
}

const BtnSvg = ({ xml, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style={[style.container]}>
      <SvgXml xml={xml} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginRight: "10%",
  },
});

export default BtnSvg;
