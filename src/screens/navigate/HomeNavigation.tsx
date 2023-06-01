import React, { ReactElement } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
import Home from "../Home";
import Scheduler from "../Scheduler";
import { calendarDraw, homeDraw, questionMarkDraw } from "../../utils/SvgSources";
import { svgStructure } from "../../utils/Helper";

const Tab = createBottomTabNavigator();

const HomeNavigation = (): ReactElement => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "Home":
              iconName = focused ? homeDraw(2.5, "#000000") : homeDraw(2, "#808080");
              break;
            case "Scheduler":
              iconName = focused ? calendarDraw(2.5, "#000000") : calendarDraw(2, "#808080");
              break;
            default:
              iconName = questionMarkDraw;
          }

          return <SvgXml xml={svgStructure(25, 24, iconName)} />;
        },
        tabBarLabel: "",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Scheduler" component={Scheduler} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
