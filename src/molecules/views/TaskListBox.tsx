import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-animatable";
import { commonFontColor } from "../../styles/Common";
import { Task } from "../../types/Task";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../../utils/Helper";
import { trashDraw } from "../../utils/SvgSources";
import { useDispatch } from "react-redux";
import { fetchTaskDelete } from "../../repositories/TaskRepository";

interface Props {
  task: Task;
  modalOn: (task: Task) => void;
}

const TaskListBox = ({ task, modalOn }: Props): ReactElement => {
  const dispatch = useDispatch();

  const removeTask = (): void => {
    dispatch(fetchTaskDelete(task.taskId) as any);
  };

  return (
    <View style={[style.container]}>
      <View style={[style.dateBox]}>
        <View>
          <TouchableOpacity onPress={removeTask}>
            <SvgXml xml={svgStructure(24, 24, trashDraw)} />
          </TouchableOpacity>
        </View>
        <View style={[style.timeBox]}>
          <Text style={[style.dateText]}>
            {task.time.startAt.hour} : {task.time.startAt.minute} {task.time.startAt.period}
          </Text>
          <Text style={[style.dateText]}>
            {task.time.endAt.hour} : {task.time.endAt.minute} {task.time.endAt.period}
          </Text>
        </View>
      </View>
      <View style={[style.taskBox, { backgroundColor: task.color }]}>
        <TouchableOpacity onPress={() => modalOn(task)}>
          <Text style={[style.titleText, commonFontColor.white]}>{task.title !== "" ? task.title : "-"}</Text>
          <Text style={[style.descriptionText, commonFontColor.white]}>{task.description !== "" ? task.description : "-"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  dateBox: {
    flexDirection: "row",
    width: 110,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
  },
  timeBox: {
    height: "100%",
    justifyContent: "space-evenly",
  },
  taskBox: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  dateText: {
    fontFamily: "jamsilRegular",
    fontSize: 12,
  },
  titleText: {
    fontFamily: "jamsilRegular",
    fontSize: 18,
  },
  descriptionText: {
    fontFamily: "jamsilRegular",
    fontSize: 12,
  },
});

export default TaskListBox;
