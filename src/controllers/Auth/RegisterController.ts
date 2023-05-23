import { Alert } from "react-native";
import { fetchDuplicateEmailCheck, fetchRegister } from "../../repositories/AccountRepository";
import { RegisterRequest } from "../../types/Request";
import { ErrorCode } from "../../types/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../screens/Navigation";

export const tryAccountValidate = async (email: string, password: string, passwordVerify: string, navigation: StackNavigationProp<RootStackParams>): Promise<void> => {
  if (email === "" || password === "" || passwordVerify === "") {
    Alert.alert("입력란을 모두 채워주세요");
    return;
  }

  if (password !== passwordVerify) {
    Alert.alert("비밀번호를 확인해주세요");
    return;
  }

  try {
    const isDuplicateEmail: boolean = await fetchDuplicateEmailCheck(email);

    if (isDuplicateEmail) {
      Alert.alert("중복된 이메일입니다");
      return;
    } else {
      navigation.navigate("RegisterS", { email, password } as any);
    }
  } catch (err) {
    Alert.alert("에러가 발생했습니다");
    return;
  }
};

export const tryRegister = async (registerRequest: RegisterRequest, navigation: StackNavigationProp<RootStackParams>): Promise<void> => {
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
      Alert.alert("회원가입에 실패했습니다");
      return;
    }
  } catch (err: any) {
    if (err.message === ErrorCode.conflict) {
      Alert.alert("중복된 이메일입니다");
    } else {
      Alert.alert("에러가 발생했습니다");
    }
  }
};
