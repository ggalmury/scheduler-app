import React, { ReactElement } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { commonPosition } from "../../styles/Common";
import { SvgXml } from "react-native-svg";
import { commonInput } from "../../styles/Input";

interface Props {
  placeholder: string;
  value: string;
  svg: string;
  onChangeText: (value: string) => void;
}

const InputTask = ({ placeholder, value, svg, onChangeText }: Props): ReactElement => {
  return (
    <View style={[commonInput.taskCreatorContainer]}>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svg} />
      </View>
      <View style={[style.inputBox]}>
        <TextInput style={[style.textInput]} placeholder={placeholder} autoCapitalize="none" value={value} onChangeText={onChangeText} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  svgBox: {
    marginRight: 15,
  },
  inputBox: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    height: "80%",
    fontFamily: "jamsilRegular",
    fontSize: 14,
  },
});

export default InputTask;
