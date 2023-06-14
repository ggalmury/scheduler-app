import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { View, Text } from "react-native-animatable";
import { format } from "date-fns";
import { commonFontColor, commonPosition } from "../styles/Common";
import { Task } from "../types/Task";
import { RootState } from "../store/RootReducer";
import TaskListBox from "../molecules/views/TaskListBox";
import { ko } from "date-fns/locale";
import TaskDetail from "./TaskDetail";
import TaskCreate from "./TaskCreate";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../utils/Helper";
import { createSquareDraw, sadDraw } from "../utils/SvgSources";

interface Props {
  selectedDay: Date;
}

const TaskList = ({ selectedDay }: Props): ReactElement => {
  const selectDayTasks: Task[] | undefined = useSelector((state: RootState) => state.task.tasks.get(format(selectedDay, "yyyy-MM-dd")));

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskCreateToggle, setTaskCreateToggle] = useState<boolean>(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo<string[]>(() => {
    return selectDayTasks ? ["50%", "85%"] : ["50%"];
  }, [selectDayTasks]);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const modalOff = (): void => {
    setModalVisible(false);
  };

  const modalOn = (task: Task): void => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const resetTaskToModal = (): void => {
    setSelectedTask(null);
  };

  const handleTaskCreateToggle = (): void => {
    setTaskCreateToggle(!taskCreateToggle);
  };

  return (
    <>
      <BottomSheetModal ref={bottomSheetModalRef} backgroundStyle={style.modal} snapPoints={snapPoints} enablePanDownToClose={false}>
        <TaskDetail isVisible={modalVisible} onBackdropPress={modalOff} onModalHide={resetTaskToModal} selectedTask={selectedTask} />
        <View style={[style.container]}>
          <View style={[style.header]}>
            <Text style={[style.date, commonFontColor.darkgrey]}>{format(selectedDay, "M월 d일 eeee", { locale: ko })}</Text>
            <TouchableOpacity onPress={handleTaskCreateToggle}>
              <SvgXml xml={svgStructure(28, 24, createSquareDraw)} />
            </TouchableOpacity>
          </View>
          {selectDayTasks ? (
            <BottomSheetFlatList data={selectDayTasks} renderItem={({ item }: any) => <TaskListBox task={item} modalOn={modalOn} />} keyExtractor={(item) => item.taskId.toString()} />
          ) : (
            <View style={[style.notFound, commonPosition.centering]}>
              <SvgXml xml={svgStructure(24, 24, sadDraw)} />
              <Text style={[style.noTaskText, commonFontColor.grey]}>일정이 없어요</Text>
            </View>
          )}
        </View>
      </BottomSheetModal>
      <TaskCreate toggle={taskCreateToggle} setToggle={handleTaskCreateToggle} selectedDay={selectedDay} />
    </>
  );
};

const style = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  body: {
    flex: 1,
  },
  date: {
    fontFamily: "jamsilBold",
    fontSize: 16,
  },
  notFound: {
    flex: 1,
    flexDirection: "row",
  },
  noTaskText: {
    fontFamily: "jamsilBold",
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default TaskList;
