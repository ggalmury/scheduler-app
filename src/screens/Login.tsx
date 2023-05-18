import React, { ReactElement } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { commonBackgroundColor, commonFontColor } from "../styles/common";
import Constants from "expo-constants";
import { isAndroid, svgStructure } from "../utils/helper";
import BtnSvg from "../components/buttons/BtnSvg";
import { appleDraw, emailDraw, facebookDraw, googleDraw, passwordDraw } from "../utils/SvgSources";
import InputAuth from "../components/inputs/InputAuth";
import BtnSubmit from "../components/buttons/BtnSubmit";

const Login = (): ReactElement => {
  return (
    <View style={[style.container, commonBackgroundColor.skyblue]}>
      <SafeAreaView style={[style.header]}>
        <Text style={[style.title]}>Schedy</Text>
      </SafeAreaView>
      <View style={[style.body, commonBackgroundColor.white]}>
        <View style={[style.introBox]}>
          <Text style={[style.intro1]}>Getting started</Text>
          <Text style={[style.intro2, commonFontColor.grey]}>Create account to continue!</Text>
        </View>
        <View style={[style.socialLoginBox]}>
          <BtnSvg xml={svgStructure(40, 16, googleDraw)} onPress={() => {}} />
          <BtnSvg xml={svgStructure(40, 16, facebookDraw)} onPress={() => {}} />
          <BtnSvg xml={svgStructure(40, 16, appleDraw)} onPress={() => {}} />
        </View>
        <View style={[style.inputBox]}>
          <InputAuth placeholder="email" svgSource={emailDraw} />
          <InputAuth placeholder="password" isPassword svgSource={passwordDraw} />
        </View>
        <View style={[style.findPasswordBox]}>
          <Text style={[style.defaultText]}>Forgot password?</Text>
        </View>
        <View style={[style.submitBtnBox]}>
          <BtnSubmit name="SIGN IN" />
          <View style={[style.formChangeBox]}>
            <Text style={[style.defaultText]}>Don't have account? </Text>
            <TouchableOpacity>
              <Text style={[style.defaultText, commonFontColor.skyblue]}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: "17%",
    paddingTop: isAndroid() ? Constants.statusBarHeight : 0,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
  },
  title: {
    paddingRight: "7%",
    fontSize: 20,
    fontFamily: "poppinsBold",
  },
  introBox: {
    height: "17%",
    justifyContent: "space-evenly",
    paddingTop: 30,
  },
  socialLoginBox: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingRight: "45%",
  },
  inputBox: {
    height: "35%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  findPasswordBox: {
    flex: 1,
  },
  submitBtnBox: {
    height: "25%",
    flexDirection: "column",
  },
  formChangeBox: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  intro1: {
    fontFamily: "poppinsBold",
    fontSize: 24,
  },
  intro2: {
    fontFamily: "poppinsRegular",
    fontSize: 14,
  },
  defaultText: {
    fontFamily: "poppinsBold",
    fontSize: 14,
  },
});

export default Login;
