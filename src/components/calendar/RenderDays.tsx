import React, { ReactElement } from "react";
import { RootState } from "../../store/RootReducer";
import { useSelector } from "react-redux";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { commonBackgroundColor, commonFontColor, commonPosition } from "../../styles/Common";
import { Task } from "../../types/Task";
import { COLOR_RED } from "../../utils/constants/Styles";

interface Props {
  today: Date;
  day: Date;
  onPress: (day: Date) => void;
}

const RenderDays = ({ today, day, onPress }: Props): ReactElement => {
  const tasks: Task[] | undefined = useSelector((state: RootState) => state.task.tasks.get(format(day, "yyyy-MM-dd")));

  return (
    <TouchableOpacity key={day.getDate()} style={[style.container, commonPosition.centering]} onPress={() => onPress(day)}>
      <Text style={[style.dayText, commonFontColor.black]}>{day.getDate()}</Text>
      {tasks && <View style={[style.taskExistDot, commonBackgroundColor.skyblue]}></View>}
      {format(day, "yyyyMMdd") === format(today, "yyyyMMdd") && <View style={[style.today]}></View>}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  dayText: {
    fontFamily: "jamsilRegular",
  },
  taskExistDot: {
    position: "absolute",
    top: "120%",
    left: "43%",
    borderRadius: 50,
    width: 7,
    height: 7,
  },
  today: {
    width: 30,
    height: 30,
    position: "absolute",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_RED,
  },
});
export default RenderDays;
