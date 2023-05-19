import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Index from "./Index";
import Home from "./Home";
import Entry from "./Entry";

export type RootStackParams = {
  Index: undefined;
  Home: undefined;
  Entry: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <RootStack.Navigator initialRouteName="Entry">
        <RootStack.Screen name="Entry" component={Entry} options={{ headerShown: false }} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Index" component={Index} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
