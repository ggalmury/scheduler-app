import React, { ReactElement } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InputAuth from "../components/inputs/InputAuth";
import { svgStructure } from "../utils/helper";
import { emailDraw, lockOffDraw, personDraw } from "../utils/SvgSources";
import { lockOnDraw } from "../utils/SvgSources";
import BtnSubmit from "../components/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/styles";
import { RootStackParams } from "./Navigation";
import { useInput } from "../hooks/useInput";

const RegisterF = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [password, setPassword, rsetPassword] = useInput<string>("");
  const [passwordVerify, setPasswordVerify, rsetPasswordVerify] = useInput<string>("");

  const gotoRegisterS = (): void => {
    navigation.navigate("RegisterS");
  };

  return (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.intro]}>이메일로 회원가입</Text>
      </View>
      <View style={[style.body]}>
        <InputAuth placeholder="abc@gmail.com" isPassword={false} svg={svgStructure(24, 24, emailDraw)} onChangeText={setEmail} />
        <InputAuth placeholder="비밀번호 입력" isPassword={true} svg={svgStructure(24, 24, lockOffDraw)} onChangeText={setPassword} />
        <InputAuth placeholder="비밀번호 확인" isPassword={true} svg={svgStructure(24, 24, lockOnDraw)} onChangeText={setPasswordVerify} />
      </View>
      <View style={[style.footer]}>
        <BtnSubmit name="다음" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={gotoRegisterS} />
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

export default RegisterF;
