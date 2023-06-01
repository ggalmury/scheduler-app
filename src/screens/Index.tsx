import React, { ReactElement } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { commonFontColor, commonPosition } from "../styles/Common";
import { svgStructure } from "../utils/Helper";
import { facebookDraw, googleDraw, kakaoDraw, naverDraw } from "../utils/SvgSources";
import BtnSocialLogin from "../molecules/buttons/BtnSocialLogin";
import { COLOR_BLACK, COLOR_FACEBOOK, COLOR_INDIGO, COLOR_IVORY, COLOR_KAKAO, COLOR_NAVER, COLOR_WHITE } from "../utils/constants/Styles";
import BtnSubmit from "../molecules/buttons/BtnSubmit";

import { RootStackParams } from "./navigate/RootNavigation";

const Index = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const image: any = require("../../assets/images/time.png");

  const gotoLogin = (): void => {
    navigation.navigate("Login");
  };

  const gotoRegister = (): void => {
    navigation.navigate("RegisterF");
  };

  return (
    <SafeAreaView style={[style.container]}>
      <View style={[style.article, commonPosition.centering]}>
        <Image source={image} style={[style.image]} />
        <Text style={[style.description, commonFontColor.black]}>소중한 시간을 기록하러 떠나볼까요?</Text>
        <Text style={[style.subDescription, commonFontColor.grey]}>제가 관리해 드릴게요!</Text>
      </View>
      <View style={[style.body]}>
        <View style={[style.loginOptionBox]}>
          <BtnSubmit name="이메일로 로그인" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} width={250} onPress={gotoLogin} />
          <BtnSubmit name="회원가입" backgroundColor={COLOR_IVORY} color={COLOR_BLACK} width={250} onPress={gotoRegister} />
        </View>
        <View style={[style.socialLoginBox, commonPosition.centering]}>
          <BtnSocialLogin
            xml={svgStructure(21, 512, kakaoDraw)}
            backgroundColor={COLOR_KAKAO}
            onPress={() => {
              navigation.navigate("HomeNavigation");
            }}
          />
          <BtnSocialLogin xml={svgStructure(18, 512, naverDraw)} backgroundColor={COLOR_NAVER} onPress={() => {}} />
          <BtnSocialLogin xml={svgStructure(28, 16, googleDraw)} backgroundColor={COLOR_IVORY} onPress={() => {}} />
          <BtnSocialLogin xml={svgStructure(18, 24, facebookDraw)} backgroundColor={COLOR_FACEBOOK} onPress={() => {}} />
        </View>
      </View>
      <View style={[style.footer]}>
        <Text style={[style.findAccountText]}>계정을 잊으셨나요? </Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  article: {
    flex: 1,
    flexDirection: "column",
  },
  body: {
    height: "40%",
    justifyContent: "center",
  },
  footer: {
    height: 60,
    alignItems: "center",
  },
  title: {
    fontFamily: "jamsilBold",
    fontSize: 18,
  },
  description: {
    fontFamily: "jamsilBold",
    fontSize: 20,
    marginTop: 30,
  },
  subDescription: {
    fontFamily: "jamsilRegular",
    fontSize: 14,
    marginTop: 15,
  },
  loginOptionBox: {
    height: "50%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  socialLoginBox: {
    height: "25%",
    flexDirection: "row",
  },
  findAccountText: {
    fontFamily: "poppinsRegular",
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});

export default Index;
