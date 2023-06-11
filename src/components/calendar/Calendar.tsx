import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import { addMonths, format } from "date-fns";
import { commonFontColor, commonPosition } from "../../styles/Common";
import { svgStructure } from "../../utils/Helper";
import { logoutDraw, reloadDraw } from "../../utils/SvgSources";
import BtnMonthSelector from "../../molecules/buttons/BtnMonthSelector";
import { RootState } from "../../store/RootReducer";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/MemberSlice";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../screens/navigate/RootNavigation";
import RenderMonths from "./RenderMonths";

interface Props {
  selectedDay: Date;
  getSelectedDay: (day: Date) => void;
}

const Calendar = ({ selectedDay, getSelectedDay }: Props): ReactElement => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const isLoggedIin: boolean = useSelector((state: RootState) => state.member.isLoggedIn);

  const [initialDate, setIinitialDate] = useState<Date>(new Date());
  const [watchingMonth, setWatchingMonth] = useState<number>(initialDate.getMonth() + 1);

  const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

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

  useEffect(() => {
    if (!isLoggedIin) {
      navigation.reset({ index: 0, routes: [{ name: "Index" }] });
    }
  }, [isLoggedIin]);

  const gotoCurrentMonth = (): void => {
    setIinitialDate(new Date());
  };

  const getWatchingMonth = (index: number): void => {
    setWatchingMonth(index + 1);
  };

  const onLogout = (): void => {
    dispatch(logout());
  };

  return (
    <View style={[style.container]}>
      <View style={[style.optionBox]}>
        <View style={[style.optionLeft]}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[style.currentDay, commonFontColor.black]}>{format(selectedDay, `yyyy년 ${watchingMonth}월`)}</Text>
          </TouchableOpacity>
          <View style={[style.refreshBox]}>
            <BtnMonthSelector xml={svgStructure(18, 24, reloadDraw)} onPress={gotoCurrentMonth} />
          </View>
        </View>
        <TouchableOpacity onPress={onLogout}>
          <SvgXml xml={svgStructure(28, 24, logoutDraw)} />
        </TouchableOpacity>
      </View>
      <View style={[style.calendar]}>
        <View style={[style.row]}>
          {days.map((day, idx) => {
            return (
              <View key={idx} style={[style.dateBox, commonPosition.centering]}>
                <Text style={[style.dayOfWeek]}>{day}</Text>
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
  refreshBox: {
    marginLeft: 10,
  },
  dateBox: {
    flex: 1,
    position: "relative",
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
  calendar: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
});

export default Calendar;
