import React, { ReactElement, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import { commonFontColor, commonPosition } from "../styles/Common";
import { svgStructure } from "../utils/Helper";
import BtnMonthSelector from "../molecules/buttons/BtnMonthSelector";
import { createSquareDraw, reloadDraw } from "../utils/SvgSources";
import { dateToYMD } from "../utils/Helper";
import { COLOR_RED, COLOR_SKYBLUE } from "../utils/constants/Styles";
import TaskCreate from "../modals/TaskCreate";
import { useFetchTask } from "../hooks/useFetchTask";

interface Props {
  bottomSheetIndex: number;
  selectedDay: moment.Moment;
  getSelectedDay: (day: moment.Moment) => void;
}

const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar = ({ bottomSheetIndex, selectedDay, getSelectedDay }: Props): ReactElement => {
  const [standardDay, setStandardDay] = useState<moment.Moment>(moment());
  const [swipeToggle, setSwipeToggle] = useState<boolean>(true);
  const [taskCreateToggle, setTaskCreateToggle] = useState<boolean>(false);

  const currentWeeks = useMemo((): number[] => {
    const firstWeek: number = standardDay.clone().startOf("month").week();
    const lastWeek: number = standardDay.clone().endOf("month").week() === 1 ? 53 : standardDay.clone().endOf("month").week();

    return Array.from({ length: lastWeek - firstWeek + 1 }, (_, index) => index + firstWeek);
  }, [standardDay]);

  const currentDays = useMemo((): moment.Moment[] => {
    const startDate: moment.Moment = standardDay.clone().startOf("month").startOf("week");
    const endDate: moment.Moment = standardDay.clone().endOf("month").endOf("week");

    let dates: moment.Moment[] = [];

    for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "day")) {
      dates.push(date.clone());
    }

    return dates;
  }, [standardDay]);

  const calendarDrawing = useMemo(() => {
    let count = 0;

    return currentWeeks.map((_, weekIdx) => {
      return (
        <View key={weekIdx} style={[style.row]}>
          {Array(7)
            .fill(0)
            .map((_, dayIdx) => {
              const day: moment.Moment = currentDays[count];
              const formattedDay: number = day.date();
              count++;

              return (
                <TouchableOpacity key={dayIdx} style={[style.dayBox, commonPosition.centering]} onPress={() => getSelectedDay(day)}>
                  <Text style={[style.day, day.month() === standardDay.month() ? commonFontColor.black : commonFontColor.grey]}>{formattedDay}</Text>
                  {selectedDay && dateToYMD(day) === dateToYMD(selectedDay) && <View style={[style.today, style.borderBlue]}></View>}
                  {dateToYMD(day) === dateToYMD(moment()) && <View style={[style.today, style.borderRed]}></View>}
                </TouchableOpacity>
              );
            })}
        </View>
      );
    });
  }, [standardDay, selectedDay]);

  useFetchTask(standardDay, standardDay, dateToYMD(standardDay) === dateToYMD(moment()));

  const nextMonth = (): void => {
    if (swipeToggle) {
      setStandardDay(standardDay.clone().add(1, "month"));
      setSwipeToggle(false);
    }
  };

  const prevMonth = (): void => {
    if (swipeToggle) {
      setStandardDay(standardDay.clone().subtract(1, "month"));
      setSwipeToggle(false);
    }
  };

  const currentMonth = (): void => {
    setStandardDay(moment());
  };

  const onGestureEvent = ({ nativeEvent }: any) => {
    if (nativeEvent.translationX > 0) {
      prevMonth();
    } else if (nativeEvent.translationX < 0) {
      nextMonth();
    }
  };

  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === 5) {
      setSwipeToggle(true);
    }
  };

  const handleTaskCreateToggle = (): void => {
    setTaskCreateToggle(!taskCreateToggle);
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <View style={[style.container]}>
        <TaskCreate toggle={taskCreateToggle} setToggle={handleTaskCreateToggle} selectedDay={selectedDay} />
        <View style={[style.optionBox]}>
          <View style={[style.optionLeft]}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[style.month]}>{bottomSheetIndex === 0 ? standardDay.format("YYYY년  MMMM") : selectedDay.format("MMMM  D일")}</Text>
            </TouchableOpacity>
            {bottomSheetIndex === 0 && (
              <View style={[style.monthSelectorBox]}>
                <BtnMonthSelector xml={svgStructure(18, 24, reloadDraw)} onPress={currentMonth} />
              </View>
            )}
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
          {calendarDrawing}
        </View>
      </View>
    </PanGestureHandler>
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
