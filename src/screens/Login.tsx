import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParams } from "./Navigation";
import { useInput } from "../hooks/useInput";
import { svgStructure } from "../utils/helper";
import { emailDraw, lockOnDraw } from "../utils/SvgSources";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/styles";
import { LoginRequest } from "../types/Request";
import { RootState } from "../store/RootReducer";
import { fetchLogin } from "../repositories/AccountRepository";
import InputAuth from "../components/inputs/InputAuth";
import BtnSubmit from "../components/buttons/BtnSubmit";

const Login = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const isLoggedIn: boolean = useSelector((state: RootState) => state.member.isLoggedIn);
  const dispatch = useDispatch();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [password, setPassword, rsetPassword] = useInput<string>("");

  useEffect(() => {
    isLoggedIn && navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }, [isLoggedIn]);

  const loginDone = async (): Promise<void> => {
    const loginRequest: LoginRequest = {
      email,
      password,
    };

    dispatch(fetchLogin(loginRequest) as any);
  };

  return (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.intro]}>이메일로 로그인</Text>
      </View>
      <View style={[style.body]}>
        <InputAuth placeholder="이메일" value={email} isPassword={false} svg={svgStructure(24, 24, emailDraw)} onChangeText={setEmail} onPress={resetEmail} />
        <InputAuth placeholder="비밀번호" value={password} isPassword={true} svg={svgStructure(24, 24, lockOnDraw)} onChangeText={setPassword} onPress={rsetPassword} />
      </View>
      <View style={[style.footer]}>
        <BtnSubmit name="다음" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={loginDone} />
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
    height: "30%",
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

export default Login;
