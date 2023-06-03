import React, { ReactElement, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import Constants from "expo-constants";
import moment from "moment";
import Calendar from "../components/Calendar";
import { isAndroid } from "../utils/Helper";
import TaskList from "../modals/TaskList";

const Scheduler = (): ReactElement => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<moment.Moment>(moment());

  const getBottomSheetIndex = (index: number): void => {
    setBottomSheetIndex(index);
  };

  const getSelectedDay = (day: moment.Moment): void => {
    setSelectedDay(day);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[style.container]}>
        <View style={[style.calendar]}>
          <Calendar bottomSheetIndex={bottomSheetIndex} selectedDay={selectedDay} getSelectedDay={getSelectedDay} />
        </View>
        <TaskList selectedDay={selectedDay} getBottomSheetIndex={getBottomSheetIndex} />
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
