import React, { ReactElement, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import RegisterCommon from "../templates/RegisterCommon";

const RegisterS = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute();

  const { email, password } = route.params as any;

  const [name, setName, rsetName] = useInput<string>("");
  const [birth, setBirth] = useState<Date | null>(null);
  const [job, setJob] = useState<JobType | null>(null);
  const [errCondition, setErrCondition] = useState<boolean>(false);

  const registerDone = async () => {
    if (name === "" || birth === null || job === null) {
      setErrCondition(true);
      return;
    }

    const registerRequest: RegisterRequest = {
      email,
      password,
      name,
      birth: birth!,
      job: job!,
    };

    await tryRegister(registerRequest, navigation);
  };

  const errMessage = (): string => {
    return errCondition ? "빈칸을 모두 채워주세요" : "";
  };

  const inputForm = (): ReactElement => {
    return (
      <>
        <InputAuth placeholder="이름" value={name} svg={svgStructure(24, 24, personDraw)} onChangeText={setName} onPress={rsetName} />
        <PickerDate date={birth} setDate={setBirth} />
        <PickerJob job={job} setJob={setJob} />
      </>
    );
  };

  const btnSubmit = (): ReactElement => {
    return <BtnSubmit name="가입하기" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={registerDone} />;
  };

  return <RegisterCommon title="회원님을 소개해 주세요!" errMessage={errMessage()} inputForm={inputForm()} btnSubmit={btnSubmit()} />;
};

export default RegisterS;
