import React, { ReactElement } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Scheduler from "../Scheduler";

const Tab = createBottomTabNavigator();

const HomeNavigation = (): ReactElement => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Scheduler" component={Scheduler} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
