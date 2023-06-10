import React, { ReactElement, useEffect, useRef } from "react";
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

interface Props {
  selectedDay: Date;
}

const TaskList = ({ selectedDay }: Props): ReactElement => {
  const selectDayTasks: Task[] | undefined = useSelector((state: RootState) => state.task.tasks.get(format(selectedDay, "yyyy-MM-dd")));
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints: string[] = ["50%", "85%"];

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModal ref={bottomSheetModalRef} backgroundStyle={style.modal} snapPoints={snapPoints} enablePanDownToClose={false}>
      <View style={[style.container]}>
        <View style={[style.header]}>
          <Text style={[style.date, commonFontColor.darkgrey]}>
            {selectedDay.toLocaleString("ko", { month: "long" })}
            {format(selectedDay, " d일")}
          </Text>
        </View>
        <FlatList data={selectDayTasks} renderItem={({ item }: any) => <TaskListBox task={item} />} keyExtractor={(item) => item.taskId.toString()} />
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
  },
  body: {
    flex: 1,
  },
  date: {
    fontFamily: "jamsilBold",
    fontSize: 14,
  },
});

export default TaskList;
