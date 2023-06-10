import React, { ReactElement, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import { SvgXml } from "react-native-svg";
import { addDays, addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import { commonBackgroundColor, commonFontColor, commonPosition } from "../styles/Common";
import { svgStructure } from "../utils/Helper";
import { createSquareDraw, reloadDraw } from "../utils/SvgSources";
import { COLOR_RED } from "../utils/constants/Styles";
import TaskCreate from "../modals/TaskCreate";
import BtnMonthSelector from "../molecules/buttons/BtnMonthSelector";
import { Task } from "../types/Task";
import { RootState } from "../store/RootReducer";

interface Props {
  selectedDay: Date;
  getSelectedDay: (day: Date) => void;
}

const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const RenderDays = ({ today, day, onPress }: { today: Date; day: Date; onPress: (day: Date) => void }): ReactElement => {
  const tasks: Task[] | undefined = useSelector((state: RootState) => state.task.tasks.get(format(day, "yyyy-MM-dd")));

  return (
    <TouchableOpacity key={day.getDate()} style={[style.dayBox, commonPosition.centering]} onPress={() => onPress(day)}>
      <Text style={[style.day, commonFontColor.white]}>{day.getDate()}</Text>
      {tasks && <View style={[style.taskExistDot, commonBackgroundColor.skyblue]}></View>}
      {format(day, "yyyyMMdd") === format(today, "yyyyMMdd") && <View style={[style.today]}></View>}
    </TouchableOpacity>
  );
};

const RenderMonths = ({ today, iteratorDate, getSelectedDay }: { today: Date; iteratorDate: Date; getSelectedDay: (day: Date) => void }): ReactElement => {
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
    <View key={iteratorDay.getMonth()} style={[style.calendar]}>
      {weeks}
    </View>
  );
};

const Calendar = ({ selectedDay, getSelectedDay }: Props): ReactElement => {
  const [initialDate, setIinitialDate] = useState<Date>(new Date());
  const [taskCreateToggle, setTaskCreateToggle] = useState<boolean>(false);
  const [watchingMonth, setWatchingMonth] = useState<number>(initialDate.getMonth() + 1);

  let iteratorDate = useMemo<Date>(() => {
    return new Date(format(initialDate, "yyyy"));
  }, [initialDate]);

  const months = useMemo<ReactElement[]>(() => {
    let monthArr: ReactElement[] = [];

    for (let i = 0; i < 12; i++) {
      monthArr.push(<RenderMonths key={i} today={initialDate} iteratorDate={iteratorDate} getSelectedDay={getSelectedDay} />);
      iteratorDate = addMonths(iteratorDate, 1);
    }

    return monthArr;
  }, [iteratorDate]);

  const handleTaskCreateToggle = (): void => {
    setTaskCreateToggle(!taskCreateToggle);
  };

  const gotoCurrentMonth = (): void => {
    setIinitialDate(new Date());
  };

  const getWatchingMonth = (index: number): void => {
    setWatchingMonth(index + 1);
  };

  return (
    <View style={[style.container]}>
      <TaskCreate toggle={taskCreateToggle} setToggle={handleTaskCreateToggle} selectedDay={selectedDay} />
      <View style={[style.optionBox]}>
        <View style={[style.optionLeft]}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[style.currentDay, commonFontColor.white]}>{format(selectedDay, `yyyy년 ${watchingMonth}월`)}</Text>
          </TouchableOpacity>
          <View style={[style.refreshBox]}>
            <BtnMonthSelector xml={svgStructure(18, 24, reloadDraw)} onPress={gotoCurrentMonth} />
          </View>
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
                <Text style={[style.dayOfWeek, commonFontColor.white]}>{day}</Text>
              </View>
            );
          })}
        </View>
        <Swiper loop={false} loadMinimal loadMinimalSize={1} showsPagination={false} index={initialDate.getMonth()} onIndexChanged={getWatchingMonth}>
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
  },
  optionBox: {
    flexDirection: "row",
    height: "18%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  calendar: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
  refreshBox: {
    marginLeft: 10,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentDay: {
    fontFamily: "jamsilBold",
    fontSize: 20,
  },
  dayOfWeek: {
    fontFamily: "jamsilBold",
  },
  row: {
    flexDirection: "row",
  },
  dayBox: {
    flex: 1,
    position: "relative",
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
    borderColor: COLOR_RED,
  },
  taskExistDot: {
    position: "absolute",
    top: "120%",
    left: "43%",
    borderRadius: 50,
    width: 7,
    height: 7,
  },
});

export default Calendar;
