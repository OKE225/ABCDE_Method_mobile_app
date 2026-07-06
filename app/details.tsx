import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

type TaskParams = {
  id: string;
  title: string;
  tag: string;
  isTaskDoneString: string;
  bgColor: string;
  badgeColor: string;
};

const Details = () => {
  const { tag, title, isTaskDoneString, bgColor, badgeColor } =
    useLocalSearchParams<TaskParams>();

  const isTaskDone = isTaskDoneString === "true" ? true : false;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor,
        alignItems: "center",
      }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          marginTop: 14,
          textDecorationLine: isTaskDone ? "line-through" : "none",
        }}>
        {title}
      </Text>

      <Text
        style={{
          backgroundColor: badgeColor,
          color: "#fff",
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 4,
          fontSize: 14,
          marginTop: 6,
        }}>
        Tag {tag}
      </Text>
    </View>
  );
};

export default Details;
