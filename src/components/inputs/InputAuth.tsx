import React, { ReactElement, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { commonPosition } from "../../styles/common";
import { SvgXml } from "react-native-svg";
import { visibleDraw } from "../../utils/SvgSources";
import { svgStructure } from "../../utils/helper";
import { COLOR_IVORY, COLOR_SKYBLUE, COLOR_WHITE } from "../../utils/constants/styles";

interface Props {
  placeholder?: string;
  isPassword?: boolean;
  svgSource: string;
}

const InputAuth = ({ placeholder, isPassword, svgSource }: Props): ReactElement => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(isPassword ? true : false);
  const animationObj = useRef<Animated.Value>(new Animated.Value(0)).current;

  const animatedStyle = {
    borderWidth: animationObj.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
    borderColor: animationObj.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", COLOR_SKYBLUE],
    }),
    backgroundColor: animationObj.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR_IVORY, COLOR_WHITE],
    }),
  };

  const handleFocus = (): void => {
    Animated.timing(animationObj, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (): void => {
    Animated.timing(animationObj, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[style.container, animatedStyle]}>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svgStructure(24, svgSource)} />
      </View>
      <View style={[style.inputBox]}>
        <TextInput style={[style.textInput]} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} secureTextEntry={isSecureTextEntry} />
      </View>
      {isPassword && (
        <TouchableOpacity style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, visibleDraw)} onPressIn={() => setIsSecureTextEntry(false)} onPressOut={() => setIsSecureTextEntry(true)} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    borderRadius: 25,
  },
  svgBox: {
    width: "20%",
  },
  inputBox: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    width: "90%",
    height: "80%",
    fontSize: 14,
    fontFamily: "poppinsRegular",
  },
  whenFocused: {
    borderWidth: 2,
    borderColor: COLOR_SKYBLUE,
  },
});

export default InputAuth;
