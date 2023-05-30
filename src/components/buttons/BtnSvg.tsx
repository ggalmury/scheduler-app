import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { commonPosition } from "../../styles/Common";

interface Props {
  xml: string;
  onPress: () => void;
}

const BtnSvg = ({ xml, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style={[style.container, commonPosition.centering]}>
      <SvgXml xml={xml} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginRight: "15%",
  },
});

export default BtnSvg;
