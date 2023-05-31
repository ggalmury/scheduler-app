import moment from "moment";
import React, { ReactElement, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Touchable } from "react-native";
import { commonPosition } from "../styles/Common";
import { svgStructure } from "../utils/Helper";
import BtnMonthSelector from "./buttons/BtnMonthSelector";
import { arrowLeftDraw, arrowRightDraw, createSquareDraw } from "../utils/SvgSources";
import { dateToYMD } from "../utils/Helper";
import { SvgXml } from "react-native-svg";
import { COLOR_RED, COLOR_SKYBLUE } from "../utils/constants/Styles";

interface Props {
  bottomSheetIndex: number;
  selectedDay: moment.Moment;
  getSelectedDay: (day: moment.Moment) => void;
}

const Calendar = ({ bottomSheetIndex, selectedDay, getSelectedDay }: Props): ReactElement => {
  const [today, setToday] = useState<moment.Moment>(moment());

  const firstWeek: number = today.clone().startOf("month").week();
  const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();
  const weekArr: number[] = Array(lastWeek - firstWeek + 1)
    .fill(0)
    .map((_, idx) => {
      return idx + firstWeek;
    });
  const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

  const nextMonth = (): void => {
    setToday(today.clone().add(1, "month"));
  };

  const prevMonth = (): void => {
    setToday(today.clone().subtract(1, "month"));
  };

  const currentMonth = (): void => {
    setToday(moment());
  };

  return (
    <View style={[style.container]}>
      <View style={[style.optionBox]}>
        <View style={[style.optionLeft]}>
          <TouchableOpacity onPress={currentMonth}>
            <Text style={[style.month]}>{bottomSheetIndex === 0 ? today.format("MMMM YYYY") : today.format("MMMM DD")}</Text>
          </TouchableOpacity>
          {bottomSheetIndex === 0 && (
            <View style={[style.monthSelectorBox]}>
              <BtnMonthSelector xml={svgStructure(30, 24, arrowLeftDraw)} onPress={prevMonth} />
              <BtnMonthSelector xml={svgStructure(30, 24, arrowRightDraw)} onPress={nextMonth} />
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => {}}>
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
        {weekArr.map((week, weekIdx) => {
          return (
            <View key={weekIdx} style={[style.row]}>
              {Array(7)
                .fill(0)
                .map((_, dayIdx) => {
                  const day: moment.Moment = today.clone().week(week).startOf("week").add(dayIdx, "day");
                  const formattedDay: string = day.format("D");

                  return (
                    <TouchableOpacity key={dayIdx} style={[style.dayBox, commonPosition.centering]} onPress={() => getSelectedDay(day)}>
                      <Text style={[style.day, { color: day.format("MM") === today.format("MM") ? "black" : "grey" }]}>{formattedDay}</Text>
                      {selectedDay && dateToYMD(day) === dateToYMD(selectedDay) && <View style={[style.today, style.borderBlue]}></View>}
                      {dateToYMD(day) === dateToYMD(moment()) && <View style={[style.today, style.borderRed]}></View>}
                    </TouchableOpacity>
                  );
                })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
