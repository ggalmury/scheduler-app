import React, { ReactElement, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { commonFontColor } from "../../styles/Common";
import { commonInput } from "../../styles/Input";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../../utils/Helper";
import { clockDraw } from "../../utils/SvgSources";
import { format } from "date-fns";

interface Props {
  title: string;
  time: Date | null;
  setTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

const PickerTime = ({ title, time, setTime }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const timepickerToggle = (): void => {
    setOpen(!open);
  };

  const contirmTime = (value: Date): void => {
    setTime(value);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={[style.container, commonInput.taskCreatorContainer]} onPress={timepickerToggle}>
        <View style={{ flexDirection: "row" }}>
          <View style={[style.svgBox]}>
            <SvgXml xml={svgStructure(20, 24, clockDraw)} />
          </View>
          <Text style={[commonFontColor.grey]}>{title}</Text>
        </View>
        <Text>{time ? format(time, "A hh : mm") : "-- : --"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal isVisible={open} mode="time" onConfirm={contirmTime} timePickerModeAndroid="spinner" onCancel={() => setOpen(false)} />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  svgBox: {
    marginRight: 15,
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PickerTime;
