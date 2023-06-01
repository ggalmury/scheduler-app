import React, { ReactElement, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { commonBackgroundColor } from "../styles/Common";
import BtnSubmit from "../molecules/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_TOMATO, COLOR_WHITE } from "../utils/constants/Styles";
import InputTask from "../molecules/inputs/InputTask";
import { useInput } from "../hooks/useInput";
import { dateToYMD, isAndroid, svgStructure } from "../utils/Helper";
import { locationDraw, pencilDraw, tagDraw } from "../utils/SvgSources";
import PickerTime from "../molecules/picker/PickerTime";
import { TaskColor, TaskColorType } from "../types/Task";
import BtnColorSelector from "../molecules/buttons/BtnColorSelector";
import { TaskCreateRequest } from "../types/Request";

interface Props {
  toggle: boolean;
  setToggle: () => void;
  today: moment.Moment;
}

const TaskCreate = ({ toggle, setToggle, today }: Props): ReactElement => {
  const [title, setTitle, resetTitle] = useInput<string>("");
  const [description, setDescription, resetDescription] = useInput<string>("");
  const [location, setLocation, resetLocation] = useInput<string>("");
  const [startTime, setStartTime] = useState<moment.Moment | null>(null);
  const [endTime, setEndTime] = useState<moment.Moment | null>(null);
  const [color, setColor] = useState<TaskColorType | null>(null);

  // exception handling required
  const taskCreateDone = (): void => {
    const taskCreateRequest: TaskCreateRequest = {
      title,
      description,
      location,
      date: dateToYMD(today),
      time: {
        startAt: {
          hour: parseInt(startTime!.format("hh")),
          minute: parseInt(startTime!.format("mm")),
        },
        endAt: {
          hour: parseInt(endTime!.format("hh")),
          minute: parseInt(endTime!.format("mm")),
        },
      },
      privacy: "default",
      color: color!,
    };

    console.log(taskCreateRequest);
  };

  return (
    <Modal visible={toggle} animationType="slide" transparent={true}>
      <View style={[style.container, commonBackgroundColor.default]}>
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <View style={[style.commonBox]}>
            <Text style={[style.titleText]}>제목</Text>
            <InputTask value={title} onChangeText={setTitle} svg={svgStructure(20, 24, tagDraw)} />
          </View>
          <View style={[style.dateBox]}>
            <View style={[style.eachTime]}>
              <Text style={[style.titleText]}>시작 시간</Text>
              <PickerTime time={startTime} setTime={setStartTime} />
            </View>
            <View style={[style.eachTime]}>
              <Text style={[style.titleText]}>종료 시간</Text>
              <PickerTime time={endTime} setTime={setEndTime} />
            </View>
          </View>
          <View style={[style.optionBox]}>
            <Text style={[style.titleText]}>색상</Text>
            <View style={[style.colorBox]}>
              <BtnColorSelector color={TaskColor.color1} setColor={setColor} />
              <BtnColorSelector color={TaskColor.color2} setColor={setColor} />
              <BtnColorSelector color={TaskColor.color3} setColor={setColor} />
              <BtnColorSelector color={TaskColor.color4} setColor={setColor} />
            </View>
          </View>
          <View style={[style.commonBox]}>
            <Text style={[style.titleText]}>메모</Text>
            <InputTask value={description} onChangeText={setDescription} svg={svgStructure(20, 24, pencilDraw)} />
          </View>
          <View style={[style.commonBox]}>
            <Text style={[style.titleText]}>장소</Text>
            <InputTask value={location} onChangeText={setLocation} svg={svgStructure(20, 24, locationDraw)} />
          </View>
          <View style={[style.footer]}>
            <BtnSubmit name="저장" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} width={120} onPress={taskCreateDone} />
            <BtnSubmit name="취소" backgroundColor={COLOR_WHITE} color={COLOR_TOMATO} width={120} onPress={setToggle} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: isAndroid() ? "90%" : "85%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commonBox: {
    justifyContent: "center",
  },
  optionBox: {
    height: "20%",
    justifyContent: "space-evenly",
  },
  colorBox: {
    flexDirection: "row",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleText: {
    fontFamily: "jamsilBold",
    fontSize: 18,
    marginVertical: 12,
  },
  eachTime: {
    width: 150,
  },
});
export default TaskCreate;
