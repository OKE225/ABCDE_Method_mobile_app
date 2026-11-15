import Task from "@/components/Task";
import { colors, radius, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface TaskType {
  id: string;
  name: string;
  tag: string;
  isDone: boolean;
}

const STORAGE_KEY = "tasksDatabase";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const loadTasks = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedTasks: TaskType[] = data ? JSON.parse(data) : [];
      setTasks(parsedTasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleTaskDone = useCallback(async (taskId: string) => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const currentTasks: TaskType[] = data ? JSON.parse(data) : [];

      const updatedTasks = currentTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task,
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));

      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAllTasks = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setTasks([]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  const doneCount = tasks.filter((task) => task.isDone).length;

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconWrapper}>
          <Ionicons name="sparkles-outline" size={30} color={colors.accent} />
        </View>

        <Text style={styles.emptyTitle}>No tasks yet</Text>
        <Text style={styles.emptySubtitle}>
          Add your first task and assign{"\n"} it a priority from A to E.
        </Text>

        <Pressable
          onPress={() => router.push("/add")}
          accessibilityRole="button"
          accessibilityLabel="Add your first task"
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}>
          <Text style={styles.primaryButtonText}>Add your first task</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>Tasks</Text>
            <Text style={styles.summaryValue}>{tasks.length}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View>
            <Text style={styles.summaryLabel}>Completed</Text>
            <Text style={styles.summaryValue}>{doneCount}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View>
            <Text style={styles.summaryLabel}>Priority</Text>
            <Text style={styles.summaryValue}>A–E</Text>
          </View>
        </View>

        {[...tasks]
          .sort((a, b) => a.tag.localeCompare(b.tag))
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              tag={task.tag}
              isDone={task.isDone}
              onToggleDone={toggleTaskDone}>
              {task.name}
            </Task>
          ))}

        <Pressable
          onPress={deleteAllTasks}
          accessibilityRole="button"
          accessibilityLabel="Delete all tasks"
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}>
          <Text style={styles.deleteButtonText}>Delete all tasks</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 34,
    backgroundColor: colors.border,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  emptyIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonText: {
    color: "#171008",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    marginTop: spacing.sm,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "600",
  },
});
