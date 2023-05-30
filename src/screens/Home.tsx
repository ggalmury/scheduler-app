import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RootStackParams } from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/MemberSlice";
import { RootState } from "../store/RootReducer";
import { Member } from "../types/Account";
import { commonPosition } from "../styles/Common";
import { dateToYMD } from "../utils/Helper";

const Home = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const member: Member = useSelector((state: RootState) => state.member);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.member.isLoggedIn);

  const gotoIndex = (): void => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: "Index" }] });
  };

  return (
    <View style={[style.container, commonPosition.centering]}>
      <TouchableOpacity onPress={gotoIndex}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>name: {member.account.name}</Text>
      <Text>email: {member.account.email}</Text>
      <Text>birth: {dateToYMD(member.account.birth)}</Text>
      <Text>job: {member.account.job}</Text>
      <Text>createdDt: {dateToYMD(member.account.createdDt)}</Text>
      <Text>isLoggedIn: {isLoggedIn.toString()}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
