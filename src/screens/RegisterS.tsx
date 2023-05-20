import React, { ReactElement } from "react";
import { StyleSheet, View, Text } from "react-native";
import InputAuth from "../components/inputs/InputAuth";
import { svgStructure } from "../utils/helper";
import { personDraw } from "../utils/SvgSources";
import BtnSubmit from "../components/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "./Navigation";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { useInput } from "../hooks/useInput";
import PickerJob from "../components/buttons/picker/PickerJob";

const RegisterS = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [name, setName, rsetName] = useInput<string>("");

  const gotoIndex = () => {
    navigation.reset({ index: 0, routes: [{ name: "Index" }] });
  };

  return (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.intro]}>회원님을 소개해 주세요!</Text>
      </View>
      <View style={[style.body]}>
        <InputAuth placeholder="이름" isPassword={false} svg={svgStructure(24, 24, personDraw)} onChangeText={setName} />
        <PickerJob />
      </View>
      <View style={[style.footer]}>
        <BtnSubmit name="가입하기" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={gotoIndex} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    height: 60,
    justifyContent: "center",
  },
  body: {
    height: "37%",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 1,
  },
  footer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
  },
  intro: {
    fontFamily: "jamsilBold",
    fontSize: 20,
  },
});

export default RegisterS;
