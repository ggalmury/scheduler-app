import React, { ReactElement, useMemo, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { commonBackgroundColor } from "../styles/Common";
import BtnSubmit from "../molecules/buttons/BtnSubmit";
import { COLOR_INDIGO, COLOR_TASK_1, COLOR_TASK_2, COLOR_TASK_3, COLOR_TASK_4, COLOR_TASK_5, COLOR_TASK_6, COLOR_TASK_7, COLOR_TOMATO, COLOR_WHITE } from "../utils/constants/Styles";
import InputTask from "../molecules/inputs/InputTask";
import { useInput } from "../hooks/useInput";
import { isAndroid, svgStructure } from "../utils/Helper";
import { locationDraw, pencilDraw, tagDraw } from "../utils/SvgSources";
import PickerTime from "../molecules/picker/PickerTime";
import { TaskColor, TaskColorType } from "../types/Task";
import BtnColorSelector from "../molecules/buttons/BtnColorSelector";
import { TaskCreateRequest } from "../types/Request";
import { useDispatch } from "react-redux";
import { fetchTaskCreate } from "../repositories/TaskRepository";
import { format } from "date-fns";

interface Props {
  toggle: boolean;
  setToggle: () => void;
  selectedDay: Date;
}

const TaskCreate = ({ toggle, setToggle, selectedDay }: Props): ReactElement => {
  const dispatch = useDispatch();

  const [title, setTitle, resetTitle] = useInput<string>("");
  const [description, setDescription, resetDescription] = useInput<string>("");
  const [location, setLocation, resetLocation] = useInput<string>("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [color, setColor, resetColor] = useInput<TaskColorType>(TaskColor.color1);

  const colorList = useMemo<string[]>(() => {
    return [COLOR_TASK_1, COLOR_TASK_2, COLOR_TASK_3, COLOR_TASK_4, COLOR_TASK_5, COLOR_TASK_6, COLOR_TASK_7];
  }, []);

  const resetForm = (): void => {
    resetTitle();
    resetDescription();
    resetLocation();
    setStartTime(null);
    setEndTime(null);
    resetColor();
  };

  const taskCreateDone = (): void => {
    if (startTime === null || endTime === null) {
      Alert.alert("시간을 선택해 주세요");
      return;
    }

    const taskCreateRequest: TaskCreateRequest = {
      title,
      description,
      location,
      date: format(selectedDay, "yyyy-MM-dd"),
      time: {
        startAt: {
          hour: parseInt(format(startTime, "hh")),
          minute: parseInt(format(startTime, "mm")),
          period: format(startTime, "a"),
        },
        endAt: {
          hour: parseInt(format(endTime, "hh")),
          minute: parseInt(format(endTime, "mm")),
          period: format(endTime, "a"),
        },
      },
      privacy: "default",
      color: color,
    };

    dispatch(fetchTaskCreate(taskCreateRequest) as any);

    setToggle();
    resetForm();
  };

  return (
    <Modal visible={toggle} animationType="slide" transparent={true}>
      <View style={[style.container, commonBackgroundColor.default]}>
        <InputTask placeholder="제목" value={title} onChangeText={setTitle} svg={svgStructure(20, 24, tagDraw)} />
        <PickerTime title="시작 시간" time={startTime} setTime={setStartTime} />
        <PickerTime title="종료 시간" time={endTime} setTime={setEndTime} />
        <View style={[style.optionBox]}>
          <Text style={[style.titleText]}>색상</Text>
          <View style={[style.colorBox]}>
            {colorList.map((value, idx) => {
              return <BtnColorSelector key={idx} backgroundColor={value} color={color} setColor={setColor} />;
            })}
          </View>
        </View>
        <InputTask placeholder="메모" value={description} onChangeText={setDescription} svg={svgStructure(20, 24, pencilDraw)} />
        <InputTask placeholder="장소" value={location} onChangeText={setLocation} svg={svgStructure(20, 24, locationDraw)} />
        <View style={[style.footer]}>
          <BtnSubmit name="저장" backgroundColor={COLOR_INDIGO} color={COLOR_WHITE} width={120} onPress={taskCreateDone} />
          <BtnSubmit name="취소" backgroundColor={COLOR_WHITE} color={COLOR_TOMATO} width={120} onPress={setToggle} />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: isAndroid() ? "93%" : "87%",
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: 30,
    paddingVertical: 30,
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
    justifyContent: "space-around",
  },
  titleText: {
    fontFamily: "jamsilBold",
    fontSize: 16,
    marginVertical: 12,
  },
});
export default TaskCreate;
