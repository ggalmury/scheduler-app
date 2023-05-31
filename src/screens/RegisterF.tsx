import React, { ReactElement, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import InputAuth from "../components/inputs/InputAuth";
import { svgStructure, validateEmail } from "../utils/Helper";
import { emailDraw, lockOffDraw } from "../utils/SvgSources";
import { lockOnDraw } from "../utils/SvgSources";
import BtnSubmit from "../components/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/Styles";
import { RootStackParams } from "./navigate/RootNavigation";
import { useInput } from "../hooks/useInput";
import RegisterCommon from "../templates/RegisterCommon";
import { fetchDuplicateEmailCheck } from "../repositories/MemeberRepository";

const RegisterF = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [password, setPassword, rsetPassword] = useInput<string>("");
  const [passwordVerify, setPasswordVerify, rsetPasswordVerify] = useInput<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const gotoRegisterS = async (): Promise<void> => {
    if (email === "" || password === "" || passwordVerify === "") {
      setErrorMsg("빈칸을 모두 채워주세요");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("이메일 형식이 아닙니다");
      return;
    }

    if (password !== passwordVerify) {
      setErrorMsg("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      const isDuplicateEmail: boolean = await fetchDuplicateEmailCheck(email);

      isDuplicateEmail ? setErrorMsg("중복된 이메일입니다") : navigation.navigate("RegisterS", { email, password } as any);
    } catch (err) {
      setErrorMsg("에러가 발생했습니다");
      return;
    }
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

  return <RegisterCommon title="이메일로 회원가입" errMessage={errorMsg} inputForm={inputForm()} btnSubmit={btnSubmit()} />;
};

export default RegisterF;
