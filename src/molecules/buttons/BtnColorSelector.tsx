import React, { ReactElement } from "react";
import { TaskColorType } from "../../types/Task";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLOR_DARKGREY } from "../../utils/constants/Styles";

interface Props {
  backgroundColor: TaskColorType;
  color: TaskColorType;
  setColor: (v: string) => void;
}

const BtnColorSelector = ({ backgroundColor, color, setColor }: Props): ReactElement => {
  const handleColor = (): void => {
    setColor(backgroundColor);
  };

  return (
    <TouchableOpacity onPress={handleColor}>
      <View style={[style.container, color === backgroundColor && style.select, { backgroundColor }]}></View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 14,
  },
  select: {
    borderWidth: 3,
    borderColor: COLOR_DARKGREY,
  },
});

export default BtnColorSelector;
