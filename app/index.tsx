import Task from "@/components/Task";
import { useCallback, useState } from "react";
import { ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

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

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  return (
    <ScrollView
      style={{
        backgroundColor: "#EDCDBB",
        flex: 1,
        padding: 16,
      }}>
      {tasks.length === 0 ? (
        <Text>You don&apos;t have any tasks</Text>
      ) : (
        [...tasks]
          .sort((a, b) => a.tag.localeCompare(b.tag))
          .map((task) => (
            <Task key={task.id} tag={task.tag}>
              {task.name}
            </Task>
          ))
      )}
    </ScrollView>
  );
}
