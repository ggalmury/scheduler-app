import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import RenderDays from "./RenderDays";

interface Props {
  today: Date;
  iteratorDate: Date;
  getSelectedDay: (day: Date) => void;
}

const RenderMonths = ({ today, iteratorDate, getSelectedDay }: Props): ReactElement => {
  const monthStart: Date = startOfMonth(iteratorDate);
  const endStart: Date = endOfMonth(iteratorDate);
  const startDate: Date = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(endStart);

  let iteratorDay: Date = startDate;
  let days: ReactElement[] = [];
  let weeks: ReactElement[] = [];
  let weekKey: number = 0;

  while (iteratorDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(<RenderDays key={iteratorDay.getDate()} today={today} day={iteratorDay} onPress={getSelectedDay} />);
      iteratorDay = addDays(iteratorDay, 1);
      weekKey++;
    }

    const week: ReactElement = (
      <View key={weekKey} style={[style.row]}>
        {days}
      </View>
    );
    weeks.push(week);

    days = [];
  }

  return (
    <View key={iteratorDay.getMonth()} style={[style.container]}>
      {weeks}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
});

export default RenderMonths;
