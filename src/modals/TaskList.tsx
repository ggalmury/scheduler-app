import React, { ReactElement, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import { commonFontColor } from "../styles/Common";
import { format } from "date-fns";

interface Props {
  selectedDay: Date;
}

const TaskList = ({ selectedDay }: Props): ReactElement => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints: string[] = ["45%", "85%"];

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModal ref={bottomSheetModalRef} backgroundStyle={style.container} snapPoints={snapPoints} enablePanDownToClose={false}>
      <View style={[style.header]}>
        <Text style={[style.date, commonFontColor.darkgrey]}>
          {selectedDay.toLocaleString("ko", { month: "long" })}
          {format(selectedDay, " d일")}
        </Text>
      </View>
    </BottomSheetModal>
  );
};

const style = StyleSheet.create({
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  date: {
    fontFamily: "jamsilBold",
    fontSize: 14,
  },
});

export default TaskList;
