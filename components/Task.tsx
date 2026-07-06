import { Pressable, Text, View } from "react-native";
import React, { ReactNode, useState } from "react";
import { router } from "expo-router";

interface TaskProps {
  id: string;
  children: ReactNode;
  tag: string;
}

const Task = ({ children, tag, id }: TaskProps) => {
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);

  let taskColors = {
    bgColor: "",
    badgeColor: "",
  };

  if (tag === "A") taskColors = { bgColor: "#ef4444", badgeColor: "#dc2626" };
  else if (tag === "B")
    taskColors = { bgColor: "#f97316", badgeColor: "#ea580c" };
  else if (tag === "C")
    taskColors = { bgColor: "#eab308", badgeColor: "#ca8a04" };
  else if (tag === "D")
    taskColors = { bgColor: "#84cc16", badgeColor: "#65a30d" };
  else if (tag === "E")
    taskColors = { bgColor: "#06b6d4", badgeColor: "#0891b2" };

  return (
    <Pressable
      onPress={() => setIsTaskDone((prev) => !prev)}
      onLongPress={() =>
        router.push({
          pathname: "/details",
          params: {
            tag,
            title: String(children),
            id,
            isTaskDoneString: String(isTaskDone),
            bgColor: taskColors.bgColor,
            badgeColor: taskColors.badgeColor,
          },
        })
      }
      style={{
        backgroundColor: isTaskDone
          ? taskColors.bgColor + "40"
          : taskColors.bgColor,
        padding: 14,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 6,
          position: "relative",
        }}>
        {/* {isTaskDone && (
          <Ionicons name="checkmark-circle-outline" size={20} color="#000" />
        )} */}
        <Text
          style={{
            backgroundColor: isTaskDone
              ? taskColors.badgeColor + "40"
              : taskColors.badgeColor,
            color: "#fff",
            paddingHorizontal: 5,
            borderRadius: 4,
            fontSize: 12,
            position: "absolute",
            right: 0,
            top: 0,
          }}>
          {tag}
        </Text>
      </View>
      <Text
        style={{
          color: isTaskDone ? "#eee" : "#fff",
          fontSize: 20,
          textDecorationLine: isTaskDone ? "line-through" : "none",
        }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Task;
