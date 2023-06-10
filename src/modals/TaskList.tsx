import React, { ReactElement, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import { commonFontColor } from "../styles/Common";
import { format } from "date-fns";
import { Task } from "../types/Task";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootReducer";
import TaskListBox from "../molecules/views/TaskListBox";
import { FlatList } from "react-native-gesture-handler";
import { ko } from "date-fns/locale";
import TaskDetail from "./TaskDetail";

interface Props {
  selectedDay: Date;
}

const TaskList = ({ selectedDay }: Props): ReactElement => {
  const selectDayTasks: Task[] | undefined = useSelector((state: RootState) => state.task.tasks.get(format(selectedDay, "yyyy-MM-dd")));

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints: string[] = ["50%", "85%"];

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const modalOff = (): void => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const modalOn = (task: Task): void => {
    setModalVisible(true);
    setSelectedTask(task);
  };

  return (
    <BottomSheetModal ref={bottomSheetModalRef} backgroundStyle={style.modal} snapPoints={snapPoints} enablePanDownToClose={false}>
      <TaskDetail modalVisible={modalVisible} modalOff={modalOff} selectedTask={selectedTask} />
      <View style={[style.container]}>
        <View style={[style.header]}>
          <Text style={[style.date, commonFontColor.darkgrey]}>{format(selectedDay, "M월 d일 eeee", { locale: ko })}</Text>
        </View>
        <FlatList data={selectDayTasks} renderItem={({ item }: any) => <TaskListBox task={item} modalOn={modalOn} />} keyExtractor={(item) => item.taskId.toString()} />
      </View>
    </BottomSheetModal>
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
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  body: {
    flex: 1,
  },
  date: {
    fontFamily: "jamsilBold",
    fontSize: 16,
  },
});

export default TaskList;
