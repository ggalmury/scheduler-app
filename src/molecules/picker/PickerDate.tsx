import React, { ReactElement, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { svgStructure } from "../../utils/Helper";
import { commonBackgroundColor, commonPosition } from "../../styles/Common";
import { arrowDownDraw, arrowUpDraw, giftDraw } from "../../utils/SvgSources";
import { commonInput } from "../../styles/Input";
import { format } from "date-fns";
import { usePicker } from "../../hooks/usePicker";

interface Props {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const PickerDate = ({ date, setDate }: Props): ReactElement => {
  const [datePicker, isPickerOn, pickerOn] = usePicker({ mode: "date", setValue: setDate });

  return (
    <>
      <TouchableOpacity style={[commonInput.authContainer, commonBackgroundColor.ivory]} onPress={pickerOn}>
        <View style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, giftDraw)} />
        </View>
        <View style={[style.textBox]}>
          <Text>{date ? format(date, "yyyy-MM-dd") : "생일이 언제신가요?"}</Text>
        </View>
        <View style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, isPickerOn ? arrowUpDraw : arrowDownDraw)} />
        </View>
      </TouchableOpacity>
      {datePicker}
    </>
  );
};

const style = StyleSheet.create({
  svgBox: {
    width: "20%",
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
  },
});

export default PickerDate;
