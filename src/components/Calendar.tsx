import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { commonPosition } from "../styles/Common";
import { svgStructure } from "../utils/Helper";
import { createSquareDraw, reloadDraw } from "../utils/SvgSources";
import { COLOR_RED, COLOR_SKYBLUE } from "../utils/constants/Styles";
import TaskCreate from "../modals/TaskCreate";
import { addDays, addMonths, endOfMonth, endOfWeek, format, getWeek, isSameDay, startOfMonth, startOfWeek, startOfYear, subMonths } from "date-fns";
import Swiper from "react-native-swiper";

interface Props {
  selectedDay: Date;
  getSelectedDay: (day: Date) => void;
}

const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const RenderDays = ({ day, onPress }: { day: Date; onPress: (day: Date) => void }) => {
  return (
    <TouchableOpacity key={day.getDate()} style={[style.dayBox, commonPosition.centering]} onPress={() => onPress(day)}>
      <Text style={[style.day]}>{day.getDate()}</Text>
    </TouchableOpacity>
  );
};

const RenderMonths = ({ initialDate, getSelectedDay }: { initialDate: Date; getSelectedDay: (day: Date) => void }) => {
  const monthStart: Date = startOfMonth(initialDate);
  const endStart: Date = endOfMonth(initialDate);
  const startDate: Date = startOfWeek(monthStart);
  const endDate: Date = endOfWeek(endStart);

  let iteratorDate: Date = startDate;
  let days: ReactElement[] = [];
  let weeks: ReactElement[] = [];
  let weekKey: number = 0;

  while (iteratorDate <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(<RenderDays key={iteratorDate.getDate()} day={iteratorDate} onPress={getSelectedDay} />);
      iteratorDate = addDays(iteratorDate, 1);
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
    <View key={iteratorDate.getMonth()} style={[style.calendar]}>
      {weeks}
    </View>
  );
};

const Calendar = ({ selectedDay, getSelectedDay }: Props): ReactElement => {
  const [taskCreateToggle, setTaskCreateToggle] = useState<boolean>(false);

  let initialDate = useMemo<Date>(() => {
    return new Date();
  }, []);

  let iteratorDate = useMemo<Date>(() => {
    return new Date(format(initialDate, "yyyy"));
  }, [initialDate]);

  const months = useMemo<ReactElement[]>(() => {
    let monthArr: ReactElement[] = [];

    for (let i = 0; i < 12; i++) {
      monthArr.push(<RenderMonths key={i} initialDate={iteratorDate} getSelectedDay={getSelectedDay} />);
      iteratorDate = addMonths(iteratorDate, 1);
    }

    return monthArr;
  }, [iteratorDate]);

  // useFetchTask(standardDay, standardDay, dateToYMD(standardDay) === dateToYMD(moment()));

  const handleTaskCreateToggle = (): void => {
    setTaskCreateToggle(!taskCreateToggle);
  };

  return (
    <View style={[style.container]}>
      <TaskCreate toggle={taskCreateToggle} setToggle={handleTaskCreateToggle} selectedDay={selectedDay} />
      <View style={[style.optionBox]}>
        <View style={[style.optionLeft]}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[style.month]}>{format(iteratorDate, `yyyy년 `)}</Text>
          </TouchableOpacity>
          {/* {bottomSheetIndex === 0 && (
              <View style={[style.monthSelectorBox]}>
                <BtnMonthSelector xml={svgStructure(18, 24, reloadDraw)} onPress={currentMonth} />
              </View>
            )} */}
        </View>
        <TouchableOpacity onPress={handleTaskCreateToggle}>
          <SvgXml xml={svgStructure(28, 24, createSquareDraw)} />
        </TouchableOpacity>
      </View>
      <View style={[style.calendar]}>
        <View style={[style.row]}>
          {days.map((day, idx) => {
            return (
              <View key={idx} style={[style.dayBox, commonPosition.centering]}>
                <Text style={[style.dayOfWeek]}>{day}</Text>
              </View>
            );
          })}
        </View>
        <Swiper loop={false} loadMinimal loadMinimalSize={1} showsPagination={false}>
          {months}
        </Swiper>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
  optionBox: {
    flexDirection: "row",
    height: "15%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  monthSelectorBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendar: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  dayBox: {
    flex: 1,
    position: "relative",
  },
  month: {
    fontFamily: "jamsilBold",
    fontSize: 20,
  },

  dayOfWeek: {
    fontFamily: "jamsilBold",
  },
  day: {
    fontFamily: "jamsilRegular",
  },
  today: {
    width: 30,
    height: 30,
    position: "absolute",
    borderRadius: 5,
    borderWidth: 1,
  },
  borderRed: {
    borderColor: COLOR_RED,
  },
  borderBlue: {
    borderColor: COLOR_SKYBLUE,
  },
});

export default Calendar;
