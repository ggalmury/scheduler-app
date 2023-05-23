import React, { ReactElement, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateToYMD, svgStructure } from "../../utils/helper";
import { commonBackgroundColor, commonPosition } from "../../styles/common";
import { arrowDownDraw, arrowUpDraw, emailDraw, giftDraw } from "../../utils/SvgSources";
import { commonInput } from "../../styles/input";
import moment from "moment";

interface Props {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const PickerDate = ({ date, setDate }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const datepickerToggle = (): void => {
    setOpen(!open);
  };

  const contirmDate = (value: Date): void => {
    setDate(value);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={[commonInput.authContainer, commonBackgroundColor.ivory]} onPress={datepickerToggle}>
        <View style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, giftDraw)} />
        </View>
        <View style={[style.textBox]}>
          <Text>{date ? dateToYMD(date) : "생일이 언제신가요?"}</Text>
        </View>
        <View style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, open ? arrowUpDraw : arrowDownDraw)} />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal isVisible={open} mode="date" display="inline" onConfirm={contirmDate} onCancel={() => setOpen(false)} />
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