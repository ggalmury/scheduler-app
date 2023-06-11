import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import Constants from "expo-constants";
import Calendar from "../components/Calendar";
import { isAndroid } from "../utils/Helper";
import TaskList from "../modals/TaskList";
import { commonBackgroundColor } from "../styles/Common";
import { useDispatch } from "react-redux";
import { fetchTaskList } from "../repositories/TaskRepository";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootReducer";
import Loading from "./Loading";

const Scheduler = (): ReactElement => {
  const dispatch = useDispatch();
  const isLoadingTask = useSelector((state: RootState) => state.task.isLoading);

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  useEffect(() => {
    dispatch(fetchTaskList() as any);
  }, []);

  const getSelectedDay = useCallback((day: Date): void => {
    setSelectedDay(day);
  }, []);

  return (
    <BottomSheetModalProvider>
      {isLoadingTask ? (
        <Loading />
      ) : (
        <SafeAreaView style={[style.container, commonBackgroundColor.default]}>
          <View style={[style.calendar]}>
            <Calendar selectedDay={selectedDay} getSelectedDay={getSelectedDay} />
          </View>
          <TaskList selectedDay={selectedDay} />
        </SafeAreaView>
      )}
    </BottomSheetModalProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isAndroid() ? Constants.statusBarHeight : 0,
  },
  calendar: {
    height: "50%",
  },
});

export default Scheduler;
