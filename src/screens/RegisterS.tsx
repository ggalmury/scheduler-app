import React, { ReactElement, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import InputAuth from "../components/inputs/InputAuth";
import { svgStructure } from "../utils/helper";
import { personDraw } from "../utils/SvgSources";
import BtnSubmit from "../components/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/styles";
import { RootStackParams } from "./Navigation";
import { useInput } from "../hooks/useInput";
import PickerJob from "../components/picker/PickerJob";
import { JobType } from "../types/Account";
import PickerDate from "../components/picker/PickerDate";
import { RegisterRequest } from "../types/Request";
import { tryRegister } from "../controllers/Auth/RegisterController";

const RegisterS = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute();

  const { email, password } = route.params as any;

  const [name, setName, rsetName] = useInput<string>("");
  const [birth, setBirth] = useState<Date | null>(null);
  const [job, setJob] = useState<JobType | null>(null);

  const registerDone = async () => {
    const registerRequest: RegisterRequest = {
      email,
      password,
      name,
      birth: birth!,
      job: job!,
    };

    await tryRegister(registerRequest, navigation);
  };

  return (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.intro]}>회원님을 소개해 주세요!</Text>
      </View>
      <View style={[style.body]}>
        <InputAuth placeholder="이름" isPassword={false} svg={svgStructure(24, 24, personDraw)} onChangeText={setName} />
        <PickerDate date={birth} setDate={setBirth} />
        <PickerJob job={job} setJob={setJob} />
      </View>
      <View style={[style.footer]}>
        <BtnSubmit name="가입하기" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={registerDone} />
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
