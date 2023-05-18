import React, { ReactElement, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import Login from "./Login";
import Home from "./Home";
import { RootState } from "../store/RootReducer";
import { useFont } from "../hooks/useFont";
import Loading from "./Loading";

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

const Navigation = (): ReactElement => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.account.isLoggedIn);

  const isFontFetched: boolean = useFont({
    poppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    poppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      {isFontFetched ? (
        <RootStack.Navigator initialRouteName="Home">
          {isLoggedIn ? <RootStack.Screen name="Home" component={Home} /> : <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />}
        </RootStack.Navigator>
      ) : (
        <Loading />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
