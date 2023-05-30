import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { commonPosition } from "../../styles/Common";

interface Props {
  xml: string;
  backgroundColor: string;
  onPress: () => void;
}

const BtnSocialLogin = ({ xml, backgroundColor, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style={[style.container, commonPosition.centering, { backgroundColor }]}>
      <SvgXml xml={xml} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default BtnSocialLogin;
