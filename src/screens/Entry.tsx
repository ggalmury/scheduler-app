import React, { ReactElement, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { commonBackgroundColor, commonFontColor, commonPosition } from "../styles/Common";
import { useFont } from "../hooks/useFont";
import { RootState } from "../store/RootReducer";
import { RootStackParams } from "./Navigation";

const Entry = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const isLoggedIn: boolean = useSelector((state: RootState) => state.member.isLoggedIn);

  useFont({
    poppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    poppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    jamsilRegular: require("../../assets/fonts/Jamsil-Regular.ttf"),
    jamsilBold: require("../../assets/fonts/Jamsil-Bold.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn ? navigation.replace("Home") : navigation.replace("Index");
    }, 1500);
  }, []);

  return (
    <View style={[style.container, commonPosition.centering, commonBackgroundColor.indigo]}>
      <Text style={[style.title, commonFontColor.white]}> SCHEDY </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
  },
});
export default Entry;
