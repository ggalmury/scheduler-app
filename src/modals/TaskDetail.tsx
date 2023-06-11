import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import Modal from "react-native-modal";
import { commonBackgroundColor } from "../styles/Common";
import { Task } from "../types/Task";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../utils/Helper";
import { calendarDraw, clockDraw, locationDraw, pencilDraw } from "../utils/SvgSources";

interface Props {
  isVisible: boolean;
  onBackdropPress: () => void;
  onModalHide: () => void;
  selectedTask: Task | null;
}

const TaskDetail = ({ isVisible, onBackdropPress, onModalHide, selectedTask }: Props): ReactElement => {
  return (
    <Modal
      style={[style.container, commonBackgroundColor.white, { borderLeftColor: selectedTask?.color }]}
      useNativeDriver={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
    >
      <View style={[style.titleBox]}>
        <Text style={[style.title]}>{selectedTask?.title !== "" ? selectedTask?.title : "-"}</Text>
      </View>
      <View style={[style.commonBox]}>
        <SvgXml xml={svgStructure(20, 24, clockDraw)} />
        <Text style={[style.commonText]}>
          {selectedTask?.time.startAt.hour} : {selectedTask?.time.startAt.minute} {selectedTask?.time.startAt.period}
        </Text>
        <Text> ~ </Text>
        <Text style={[style.commonText]}>
          {selectedTask?.time.endAt.hour} : {selectedTask?.time.endAt.minute} {selectedTask?.time.endAt.period}
        </Text>
      </View>
      <View style={[style.commonBox]}>
        <SvgXml xml={svgStructure(20, 24, calendarDraw)} />
        <Text style={[style.commonText]}>{selectedTask?.date}</Text>
      </View>
      <View style={[style.commonBox]}>
        <SvgXml xml={svgStructure(20, 24, locationDraw)} />
        <Text style={[style.commonText]}>{selectedTask?.location !== "" ? selectedTask?.location : "-"}</Text>
      </View>
      <View style={[style.commonBox]}>
        <SvgXml xml={svgStructure(20, 24, pencilDraw)} />
        <Text style={[style.commonText]}>{selectedTask?.description !== "" ? selectedTask?.description : "-"}</Text>
      </View>
      <View style={[style.commonBox]}></View>
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
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 10,
    paddingHorizontal: 25,
  },
  titleBox: {
    height: "25%",
    justifyContent: "center",
  },
  commonBox: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "jamsilBold",
    fontSize: 22,
  },
  commonText: {
    fontFamily: "jamsilRegular",
    paddingHorizontal: 20,
  },
});

export default TaskDetail;
