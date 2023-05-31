import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Index from "../Index";
import Home from "../Home";
import Entry from "../Entry";
import Login from "../Login";
import RegisterF from "../RegisterF";
import RegisterS from "../RegisterS";
import HomeNavigation from "./HomeNavigation";

export type RootStackParams = {
  Entry: undefined;
  Index: undefined;
  Login: undefined;
  RegisterF: undefined;
  RegisterS: undefined;
  HomeNavigation: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const RootNavigation = (): ReactElement => {
  const defaultHeaderOptions: StackNavigationOptions = {
    headerTitle: "",
    headerBackTitle: "",
    headerStyle: {
      backgroundColor: "transparent",
      elevation: 0,
      shadowOpacity: 0,
    },
  };

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <RootStack.Navigator initialRouteName="Entry">
        <RootStack.Screen
          name="Index"
          component={Index}
          options={{ headerTitle: "SCHEDY", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "jamsilBold" }, headerStyle: { backgroundColor: "transparent", elevation: 0, shadowOpacity: 0 } }}
        />
        <RootStack.Screen name="Entry" component={Entry} options={{ headerShown: false }} />
        <RootStack.Screen name="Login" component={Login} options={defaultHeaderOptions} />
        <RootStack.Screen name="RegisterF" component={RegisterF} options={defaultHeaderOptions} />
        <RootStack.Screen name="RegisterS" component={RegisterS} options={defaultHeaderOptions} />
        <RootStack.Screen name="HomeNavigation" component={HomeNavigation} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
