import React, { ReactElement, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { commonPosition } from "../../styles/common";
import { SvgXml } from "react-native-svg";
import { circleXDraw, visibleDraw } from "../../utils/SvgSources";
import { svgStructure } from "../../utils/helper";
import { COLOR_INDIGO, COLOR_IVORY, COLOR_WHITE } from "../../utils/constants/styles";
import { commonInput } from "../../styles/input";

interface Props {
  value: string;
  placeholder?: string;
  isPassword?: boolean;
  svg: string;
  onPress: () => void;
  onChangeText: (t: any) => void;
}

const InputAuth = ({ value, placeholder, isPassword, svg, onChangeText, onPress }: Props): ReactElement => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(isPassword ? true : false);
  const animationObj = useRef<Animated.Value>(new Animated.Value(0)).current;

  const animatedStyle = {
    borderWidth: animationObj.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    }),
    borderColor: animationObj.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", COLOR_INDIGO],
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
    <Animated.View style={[commonInput.authContainer, animatedStyle]}>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svg} />
      </View>
      <View style={[style.inputBox]}>
        <TextInput autoCapitalize="none" value={value} style={[style.textInput]} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} onChangeText={onChangeText} secureTextEntry={isSecureTextEntry} />
      </View>
      {isPassword && (
        <View style={[commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, visibleDraw)} onPressIn={() => setIsSecureTextEntry(false)} onPressOut={() => setIsSecureTextEntry(true)} />
        </View>
      )}
      <TouchableOpacity style={[style.svgBox, commonPosition.centering]} onPressIn={onPress}>
        <SvgXml xml={svgStructure(24, 24, circleXDraw)} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  svgBox: {
    marginHorizontal: 20,
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
});

export default InputAuth;
