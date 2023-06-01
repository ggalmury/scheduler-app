import React, { ReactElement } from "react";
import { TaskColorType } from "../../types/Task";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

interface Props {
  color: TaskColorType;
  setColor: React.Dispatch<React.SetStateAction<string | null>>;
}

const BtnColorSelector = ({ color, setColor }: Props): ReactElement => {
  const handleColor = (): void => {
    setColor(color);
  };

  return <TouchableOpacity style={[style.container, { backgroundColor: color }]} onPress={handleColor} />;
};

const style = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 7,
  },
});

export default BtnColorSelector;
