import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/MemberSlice";
import { RootState } from "../store/RootReducer";
import { Member } from "../types/Account";
import { commonPosition } from "../styles/Common";
import { useFetchTask } from "../hooks/useFetchTask";

const Home = (): ReactElement => {
  const dispatch = useDispatch();

  const member: Member = useSelector((state: RootState) => state.member);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.member.isLoggedIn);

  useFetchTask(new Date());

  const gotoIndex = (): void => {
    dispatch(logout());
  };

  return (
    <View style={[style.container, commonPosition.centering]}>
      <TouchableOpacity onPress={gotoIndex}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>uuid: {member.account.uuid}</Text>
      <Text>name: {member.account.name}</Text>
      <Text>email: {member.account.email}</Text>
      <Text>job: {member.account.job}</Text>
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
