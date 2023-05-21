import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { commonBackgroundColor, commonPosition } from "../../../styles/common";
import { SvgXml } from "react-native-svg";
import { svgStructure } from "../../../utils/helper";
import { arrowDownDraw, arrowUpDraw, emailDraw } from "../../../utils/SvgSources";

const PickerJob = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const items = [
    { label: "보기1", value: "1" },
    { label: "보기2", value: "2" },
    { label: "보기3", value: "3" },
    { label: "보기4", value: "4" },
    { label: "보기5", value: "5" },
    { label: "보기6", value: "6" },
    { label: "보기7", value: "7" },
    { label: "보기8", value: "8" },
    { label: "보기9", value: "9" },
    { label: "보기10", value: "10" },
    { label: "보기11", value: "11" },
    { label: "보기12", value: "12" },
    { label: "보기13", value: "13" },
    { label: "보기14", value: "14" },
    { label: "보기15", value: "15" },
    { label: "보기16", value: "16" },
  ];

  const dropdownToggle = (): void => {
    setOpen(!open);
  };

  return (
    <View style={[style.container, commonBackgroundColor.ivory]}>
      <View style={[style.banner, commonPosition.centering]}>
        <View style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, emailDraw)} />
        </View>
        <View style={[style.textBox]}>
          <Text>직업이 무엇인가요?</Text>
        </View>
        <View style={[style.svgBox, commonPosition.centering]}>
          <SvgXml xml={svgStructure(24, 24, open ? arrowUpDraw : arrowDownDraw)} onPress={dropdownToggle} />
        </View>
      </View>
      <ScrollView style={[style.dropdown, commonBackgroundColor.ivory, { display: open ? "flex" : "none" }]}>
        {items.map((item, idx) => {
          return (
            <TouchableOpacity key={idx} style={[style.item]}>
              <Text>{item.value}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 55,
    borderRadius: 25,
    position: "relative",
  },
  banner: {
    width: "100%",
    flexDirection: "row",
    height: 55,
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
    width: "100%",
    height: 200,
    borderRadius: 25,
    top: 70,
  },
  item: {
    height: 40,
    justifyContent: "center",
    paddingLeft: 30,
  },
});

export default PickerJob;
