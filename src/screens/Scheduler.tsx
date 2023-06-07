import React, { ReactElement, useCallback, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import Constants from "expo-constants";
import Calendar from "../components/Calendar";
import { isAndroid } from "../utils/Helper";
import TaskList from "../modals/TaskList";

const Scheduler = (): ReactElement => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const getSelectedDay = useCallback((day: Date): void => {
    setSelectedDay(day);
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[style.container]}>
        <View style={[style.calendar]}>
          <Calendar selectedDay={selectedDay} getSelectedDay={getSelectedDay} />
        </View>
        <TaskList selectedDay={selectedDay} />
      </SafeAreaView>
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
