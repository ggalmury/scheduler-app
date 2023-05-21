import React, { ReactElement, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../../../utils/helper";
import { commonBackgroundColor, commonPosition } from "../../../styles/common";
import { arrowDownDraw, arrowUpDraw, emailDraw } from "../../../utils/SvgSources";

interface Props {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const PickerDate = ({ date, setDate }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const datepickerToggle = (): void => {
    setOpen(!open);
  };

  return (
    <TouchableOpacity style={[style.container, commonBackgroundColor.ivory]} onPress={datepickerToggle}>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svgStructure(24, 24, emailDraw)} />
      </View>
      <View style={[style.textBox]}>
        <Text>{date.toString()}</Text>
      </View>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svgStructure(24, 24, open ? arrowUpDraw : arrowDownDraw)} />
      </View>
    </TouchableOpacity>
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
  textBox: {
    flex: 1,
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: 70,
    width: "100%",
    borderRadius: 25,
  },
  item: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 30,
  },
  jobText: {
    fontFamily: "jamsilRegular",
  },
});

export default PickerDate;
