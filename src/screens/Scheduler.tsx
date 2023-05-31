import moment from "moment";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import Constants from "expo-constants";
import Calendar from "../components/Calendar";
import { dateToYMD, isAndroid } from "../utils/Helper";

const Scheduler = (): ReactElement => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<moment.Moment>(moment());

  const snapPoints: string[] = ["45%", "85%"];

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
        <BottomSheetModal ref={bottomSheetModalRef} backgroundStyle={style.bottomSheetModal} snapPoints={snapPoints} enablePanDownToClose={false} onChange={getBottomSheetIndex}>
          <View>
            <Text>{dateToYMD(selectedDay)}</Text>
          </View>
        </BottomSheetModal>
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
  bottomSheetModal: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default Scheduler;
