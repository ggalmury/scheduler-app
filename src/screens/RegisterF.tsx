import React, { ReactElement, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InputAuth from "../components/inputs/InputAuth";
import { svgStructure } from "../utils/helper";
import { emailDraw, lockOffDraw } from "../utils/SvgSources";
import { lockOnDraw } from "../utils/SvgSources";
import BtnSubmit from "../components/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/styles";
import { RootStackParams } from "./Navigation";
import { useInput } from "../hooks/useInput";
import { tryAccountValidate } from "../controllers/Auth/RegisterController";
import RegisterCommon from "../templates/RegisterCommon";

interface ErrCondition {
  isBlank: boolean;
  isPasswordNotMatches: boolean;
}

const RegisterF = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [password, setPassword, rsetPassword] = useInput<string>("");
  const [passwordVerify, setPasswordVerify, rsetPasswordVerify] = useInput<string>("");
  const [errCondition, setErrCondition] = useState<ErrCondition>({ isBlank: false, isPasswordNotMatches: false });

  const gotoRegisterS = async (): Promise<void> => {
    if (email === "" || password === "" || passwordVerify === "") {
      setErrCondition((prev) => {
        return { ...prev, isBlank: true, isPasswordNotMatches: false };
      });
      return;
    }

    if (password !== passwordVerify) {
      setErrCondition((prev) => {
        return { ...prev, isBlank: false, isPasswordNotMatches: true };
      });
      return;
    }

    await tryAccountValidate(email, password, passwordVerify, navigation);
  };

  const errMessage = (): string => {
    return errCondition.isBlank ? "빈칸을 모두 채워주세요" : errCondition.isPasswordNotMatches ? "비밀번호가 일치하지 않습니다" : "";
  };

  const inputForm = (): ReactElement => {
    return (
      <>
        <InputAuth placeholder="abc@gmail.com" value={email} svg={svgStructure(24, 24, emailDraw)} onChangeText={setEmail} onPress={resetEmail} />
        <InputAuth placeholder="비밀번호 입력" value={password} isPassword={true} svg={svgStructure(24, 24, lockOffDraw)} onChangeText={setPassword} onPress={rsetPassword} />
        <InputAuth placeholder="비밀번호 확인" value={passwordVerify} isPassword={true} svg={svgStructure(24, 24, lockOnDraw)} onChangeText={setPasswordVerify} onPress={rsetPasswordVerify} />
      </>
    );
  };

  const btnSubmit = (): ReactElement => {
    return <BtnSubmit name="다음" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={gotoRegisterS} />;
  };

  return <RegisterCommon title="이메일로 회원가입" errMessage={errMessage()} inputForm={inputForm()} btnSubmit={btnSubmit()} />;
};

export default RegisterF;
