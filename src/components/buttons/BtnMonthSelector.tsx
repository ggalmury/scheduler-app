import React, { ReactElement } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

interface Props {
  xml: string;
  onPress: () => void;
}

const BtnMonthSelector = ({ xml, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={xml} onPress={onPress} />
    </TouchableOpacity>
  );
};

export default BtnMonthSelector;
