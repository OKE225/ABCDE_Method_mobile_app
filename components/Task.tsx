import { colors, radius, spacing, tagStyles } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TaskProps {
  id: string;
  children: ReactNode;
  tag: string;
  isDone: boolean;
  onToggleDone: (id: string) => void;
}

const Task = ({ children, tag, id, isDone, onToggleDone }: TaskProps) => {
  const currentTag = tagStyles[tag] ?? {
    color: colors.textSecondary,
    soft: colors.surfaceElevated,
    label: "Task",
  };

  const openDetails = () => {
    router.push({
      pathname: "/details",
      params: {
        tag,
        title: String(children),
        id,
        isTaskDoneString: String(isDone),
        bgColor: currentTag.color,
        badgeColor: currentTag.color,
      },
    });
  };

  return (
    <Pressable
      onPress={() => onToggleDone(id)}
      onLongPress={openDetails}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: isDone ? currentTag.soft : colors.surface,
          borderColor: isDone ? currentTag.color : colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}>
      <View style={styles.cardTopRow}>
        <View
          style={[
            styles.tagPill,
            {
              backgroundColor: currentTag.soft,
              borderColor: currentTag.color,
            },
          ]}>
          <View
            style={[styles.tagDot, { backgroundColor: currentTag.color }]}
          />
          <Text style={[styles.tagText, { color: currentTag.color }]}>
            {tag} · {currentTag.label}
          </Text>
        </View>

        <View
          style={[
            styles.checkCircle,
            {
              borderColor: isDone ? currentTag.color : colors.border,
              backgroundColor: isDone ? currentTag.color : "transparent",
            },
          ]}>
          {isDone && <Ionicons name="checkmark" size={14} color="#0B0F14" />}
        </View>
      </View>

      <Text
        style={[styles.taskTitle, isDone && styles.taskTitleDone]}
        numberOfLines={2}>
        {children}
      </Text>

      <Text style={styles.hintText}>Tap to complete · Hold for details</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  taskTitleDone: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  hintText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: 12,
  },
});

export default Task;
