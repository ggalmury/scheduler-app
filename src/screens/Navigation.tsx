import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import Login from "./Login";
import Home from "./Home";

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
