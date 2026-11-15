import { colors, radius, spacing, tagStyles } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TaskParams = {
  id: string;
  title: string;
  tag: string;
  isTaskDoneString: string;
  bgColor: string;
  badgeColor: string;
};

const Details = () => {
  const { tag, title, isTaskDoneString } = useLocalSearchParams<TaskParams>();

  const isTaskDone = isTaskDoneString === "true";
  const currentTag = tagStyles[tag ?? ""] ?? {
    color: colors.textSecondary,
    soft: colors.surfaceElevated,
    label: "Task",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View
        style={[
          styles.priorityBadge,
          {
            backgroundColor: currentTag.soft,
            borderColor: currentTag.color,
          },
        ]}>
        <Text style={[styles.priorityBadgeText, { color: currentTag.color }]}>
          {tag} · {currentTag.label}
        </Text>
      </View>

      <Text style={[styles.title, isTaskDone && styles.titleDone]}>
        {title}
      </Text>

      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: isTaskDone
                ? currentTag.color
                : colors.textSecondary,
            },
          ]}
        />
        <Text style={styles.statusText}>
          {isTaskDone ? "Completed" : "In progress"}
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.description}>
        This task belongs to priority group {tag}. Long-press a task on the list
        to open its details.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: spacing.md,
  },
  closeButton: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityBadge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: spacing.md,
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  titleDone: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default Details;
