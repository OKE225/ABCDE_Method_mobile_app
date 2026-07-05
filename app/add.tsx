import { Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, SegmentedButtons, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "tasksDatabase";

const AddScreen = () => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = async () => {
    if (!name || !tag) return;

    const newTask = {
      id: Date.now().toString(),
      name: name,
      tag: tag,
      isDone: false,
    };

    try {
      const existTasks = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks = existTasks ? JSON.parse(existTasks) : [];

      const updateTasks = [...tasks, newTask];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updateTasks));

      setName("");
      setTag("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#EDCDBB",
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}>
      <TextInput
        mode="outlined"
        value={name}
        onChangeText={setName}
        placeholder="Enter Task Name"
      />

      <Text style={{ marginTop: 12 }}>Choose Task Tag</Text>
      <SegmentedButtons
        value={tag}
        onValueChange={setTag}
        buttons={[
          { value: "A", label: "A" },
          { value: "B", label: "B" },
          { value: "C", label: "C" },
          { value: "D", label: "D" },
          { value: "E", label: "E" },
        ]}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!tag || !name}
        style={{ marginTop: 64 }}>
        Add New Task
      </Button>
    </View>
  );
};

export default AddScreen;
