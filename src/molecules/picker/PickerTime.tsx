import React, { ReactElement, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { commonBackgroundColor } from "../../styles/Common";
import moment from "moment";
import { commonInput } from "../../styles/Input";

interface Props {
  time: moment.Moment | null;
  setTime: React.Dispatch<React.SetStateAction<moment.Moment | null>>;
}

const PickerTime = ({ time, setTime }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const timepickerToggle = (): void => {
    setOpen(!open);
  };

  const contirmTime = (value: Date): void => {
    setTime(moment(value));
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={[commonInput.taskCreatorContainer, commonBackgroundColor.ivory]} onPress={timepickerToggle}>
        <View style={[style.textBox]}>
          <Text>{time ? moment(time).format("A hh : mm") : "-- : --"}</Text>
        </View>
      </TouchableOpacity>
      <DateTimePickerModal isVisible={open} mode="time" onConfirm={contirmTime} onCancel={() => setOpen(false)} />
    </>
  );
};

const style = StyleSheet.create({
  textBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PickerTime;
