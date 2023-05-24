import React, { ReactElement, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { commonFontColor } from "../styles/common";

interface Props {
  title: string;
  errMessage: string;
  inputForm: ReactElement;
  btnSubmit: ReactElement;
}

const RegisterCommon = ({ title, errMessage, inputForm, btnSubmit }: Props): ReactElement => {
  const [animationInit, setAnimationInit] = useState<boolean>(false);

  return (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.intro]}>{title}</Text>
      </View>
      <View style={[style.errCondition]}>
        <Animatable.Text
          animation={animationInit ? "shake" : undefined}
          onAnimationEnd={() => {
            setAnimationInit(false);
          }}
          style={[style.errText, commonFontColor.tomato]}
        >
          {errMessage}
        </Animatable.Text>
      </View>
      <View style={[style.body]}>{inputForm}</View>
      <View style={[style.footer]}>{btnSubmit}</View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    height: 50,
    justifyContent: "flex-end",
  },
  body: {
    height: "40%",
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
  errCondition: {
    height: "5%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  errText: {
    fontFamily: "jamsilBold",
    fontSize: 16,
  },
});

export default RegisterCommon;
