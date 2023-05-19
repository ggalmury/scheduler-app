import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParams } from "./Navigation";
import { useDispatch } from "react-redux";
import { falsely, reset, truely } from "../store/slices/MemberSlice";

const Home = (): ReactElement => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const gotoEntry = (): void => {
    navigation.navigate("Entry");
  };

  const gotoIndex = (): void => {
    navigation.navigate("Index");
  };

  return (
    <View>
      <Text>Hello World Home</Text>
      <TouchableOpacity onPress={gotoEntry}>
        <Text>Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoIndex}>
        <Text>Index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(reset());
        }}
      >
        <Text>reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(truely());
        }}
      >
        <Text>truely</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(falsely());
        }}
      >
        <Text>falsely</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
