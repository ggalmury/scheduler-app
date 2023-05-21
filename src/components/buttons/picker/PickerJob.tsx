import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { commonBackgroundColor, commonPosition } from "../../../styles/common";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../../../utils/helper";
import { arrowDownDraw, arrowUpDraw, emailDraw } from "../../../utils/SvgSources";
import { Job, JobType } from "../../../types/Account";

interface Props {
  job: JobType | null;
  setJob: React.Dispatch<React.SetStateAction<JobType | null>>;
}

const PickerJob = ({ job, setJob }: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const items = [
    { label: "보기1", value: Job.STUDENT },
    { label: "보기2", value: Job.WORKER },
    { label: "보기3", value: Job.FREELANCER },
    { label: "보기4", value: Job.JOBAPP },
    { label: "보기5", value: Job.NONE },
    { label: "보기6", value: Job.PRIVATE },
    { label: "보기1", value: Job.STUDENT },
    { label: "보기2", value: Job.WORKER },
    { label: "보기3", value: Job.FREELANCER },
    { label: "보기4", value: Job.JOBAPP },
    { label: "보기5", value: Job.NONE },
    { label: "보기6", value: Job.PRIVATE },
  ];

  const dropdownToggle = (): void => {
    setOpen(!open);
  };

  const getJob = (value: JobType): void => {
    setJob(value);
    setOpen(false);
  };

  return (
    <TouchableOpacity style={[style.container, commonBackgroundColor.ivory]} onPress={dropdownToggle}>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svgStructure(24, 24, emailDraw)} />
      </View>
      <View style={[style.textBox]}>
        <Text>{job ? job : "직업이 무엇인가요?"}</Text>
      </View>
      <View style={[style.svgBox, commonPosition.centering]}>
        <SvgXml xml={svgStructure(24, 24, open ? arrowUpDraw : arrowDownDraw)} />
      </View>
      <ScrollView style={[style.dropdown, commonBackgroundColor.ivory, { display: open ? "flex" : "none" }]}>
        {items.map((item, idx) => {
          return (
            <TouchableOpacity key={idx} style={[style.item]} onPress={() => getJob(item.value)}>
              <Text style={[style.jobText]}>{item.value}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    borderRadius: 25,
    position: "relative",
  },
  svgBox: {
    width: "20%",
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    top: 70,
    width: "100%",
    height: 150,
    borderRadius: 25,
  },
  item: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 30,
  },
  jobText: {
    fontFamily: "jamsilRegular",
  },
});

export default PickerJob;
