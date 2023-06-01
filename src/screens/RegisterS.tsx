import React, { ReactElement, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import InputAuth from "../molecules/inputs/InputAuth";
import { svgStructure } from "../utils/Helper";
import { personDraw } from "../utils/SvgSources";
import BtnSubmit from "../molecules/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/Styles";
import { RootStackParams } from "./navigate/RootNavigation";
import { useInput } from "../hooks/useInput";
import PickerJob from "../molecules/picker/PickerJob";
import { JobType } from "../types/Account";
import PickerDate from "../molecules/picker/PickerDate";
import { RegisterRequest } from "../types/Request";
import RegisterCommon from "../templates/RegisterCommon";
import { fetchRegister } from "../repositories/MemeberRepository";
import { ErrorCode } from "../types/Common";

const RegisterS = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute();

  const { email, password } = route.params as any;

  const [name, setName, rsetName] = useInput<string>("");
  const [birth, setBirth] = useState<Date | null>(null);
  const [job, setJob] = useState<JobType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const registerDone = async () => {
    if (name === "" || birth === null || job === null) {
      setErrorMsg("빈칸을 모두 채워주세요");
      return;
    }

    const registerRequest: RegisterRequest = {
      email,
      password,
      name,
      birth: birth!,
      job: job!,
    };

    try {
      const isSuccess: boolean = await fetchRegister(registerRequest);

      if (isSuccess) {
        Alert.alert("회원가입이 완료되었습니다", undefined, [
          {
            text: "확인",
            onPress: () => {
              navigation.reset({ index: 0, routes: [{ name: "Index" }] });
            },
          },
        ]);
      } else {
        setErrorMsg("회원가입에 실패했습니다");
        return;
      }
    } catch (err: any) {
      if (err.message === ErrorCode.conflict) {
        setErrorMsg("중복된 이메일입니다");
      } else {
        setErrorMsg("에러가 발생했습니다");
      }
    }
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
    return <BtnSubmit name="가입하기" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} width={250} onPress={registerDone} />;
  };

  return <RegisterCommon title="회원님을 소개해 주세요!" errMessage={errorMsg} inputForm={inputForm()} btnSubmit={btnSubmit()} />;
};

export default RegisterS;
