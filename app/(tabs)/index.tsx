import Task from "@/components/Task";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useFocusEffect, router } from "expo-router";

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

  return tasks.length === 0 ? (
    <View
      style={{
        backgroundColor: "#EDCDBB",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text style={{ fontSize: 20 }}>You don&apos;t have any tasks</Text>
      <Button
        mode="contained"
        style={{ marginTop: 12, backgroundColor: "#7D5A50" }}
        onPress={() => router.push("/add")}>
        Add Your First Task
      </Button>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
      style={{
        backgroundColor: "#EDCDBB",
        flex: 1,
      }}>
      {[...tasks]
        .sort((a, b) => a.tag.localeCompare(b.tag))
        .map((task) => (
          <Task key={task.id} id={task.id} tag={task.tag}>
            {task.name}
          </Task>
        ))}
      <Button onPress={() => deleteAllTasks()} textColor="#dc2626">
        Delete All Tasks
      </Button>
    </ScrollView>
  );
}
