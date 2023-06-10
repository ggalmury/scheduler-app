import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import Modal from "react-native-modal";
import { commonBackgroundColor } from "../styles/Common";
import { Task } from "../types/Task";

interface Props {
  modalVisible: boolean;
  modalOff: () => void;
  selectedTask: Task | null;
}

const TaskDetail = ({ modalVisible, modalOff, selectedTask }: Props): ReactElement => {
  return (
    <Modal style={[style.container, commonBackgroundColor.white]} useNativeDriver={true} animationIn="fadeIn" animationOut="fadeOut" isVisible={modalVisible} onBackdropPress={modalOff}>
      <View>
        <Text>{selectedTask?.title}</Text>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: 330,
    height: 450,
    top: "50%",
    left: "50%",
    marginLeft: -165,
    marginTop: -225,
    borderRadius: 20,
  },
});

export default TaskDetail;
