import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParams } from "./Navigation";
import { useInput } from "../hooks/useInput";
import { svgStructure } from "../utils/Helper";
import { emailDraw, lockOnDraw } from "../utils/SvgSources";
import { COLOR_INDIGO, COLOR_WHITE } from "../utils/constants/Styles";
import { LoginRequest } from "../types/Request";
import { RootState } from "../store/RootReducer";
import { fetchLogin } from "../repositories/MemeberRepository";
import InputAuth from "../components/inputs/InputAuth";
import BtnSubmit from "../components/buttons/BtnSubmit";
import RegisterCommon from "../templates/RegisterCommon";
import { ErrorCode } from "../types/common";

const Login = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const isLoggedIn: boolean = useSelector((state: RootState) => state.member.isLoggedIn);
  const dispatch = useDispatch();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [password, setPassword, rsetPassword] = useInput<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    isLoggedIn && navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }, [isLoggedIn]);

  const loginDone = async (): Promise<void> => {
    if (email === "" || password === null) {
      setErrorMsg("빈칸을 모두 채워주세요");
      return;
    }

    const loginRequest: LoginRequest = {
      email,
      password,
    };

    dispatch(fetchLogin(loginRequest) as any).then((value: any) => {
      switch (value.error?.message) {
        case ErrorCode.notFound:
          setErrorMsg("등록되지 않은 이메일입니다");
          break;
        default:
          setErrorMsg("에러가 발생했습니다");
          break;
      }
    });
  };

  const inputForm = (): ReactElement => {
    return (
      <>
        <InputAuth placeholder="이메일" value={email} isPassword={false} svg={svgStructure(24, 24, emailDraw)} onChangeText={setEmail} onPress={resetEmail} />
        <InputAuth placeholder="비밀번호" value={password} isPassword={true} svg={svgStructure(24, 24, lockOnDraw)} onChangeText={setPassword} onPress={rsetPassword} />
      </>
    );
  };

  const btnSubmit = (): ReactElement => {
    return <BtnSubmit name="다음" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} onPress={loginDone} />;
  };

  return <RegisterCommon title="로그인 해주세요" errMessage={errorMsg} inputForm={inputForm()} btnSubmit={btnSubmit()} />;
};

export default Login;
