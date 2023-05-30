import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import { commonPosition } from "../styles/Common";

const Loading = (): ReactElement => {
  return (
    <View style={[style.container, commonPosition.centering]}>
      <Text style={[style.text]}>Loading ...</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
  },
});

export default Loading;
