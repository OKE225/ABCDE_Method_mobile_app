import { Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  SegmentedButtons,
  Button,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

const STORAGE_KEY = "tasksDatabase";

const AddScreen = () => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [visible, setVisible] = useState(false);

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
    <Provider>
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
          outlineColor="#7D5A50"
          activeOutlineColor="#5D4037"
          textColor="#5D4037"
          theme={{ colors: { onSurfaceVariant: "#8D6E63" } }}
          style={{ backgroundColor: "#EDCDBB" }}
        />
        <Text style={{ marginTop: 32 }}>Choose Task Tag</Text>
        <SegmentedButtons
          value={tag}
          onValueChange={setTag}
          buttons={[
            {
              value: "A",
              label: "A",
              style: {
                backgroundColor: tag === "A" ? "#ef4444" : "transparent",
              },
            },
            {
              value: "B",
              label: "B",
              style: {
                backgroundColor: tag === "B" ? "#f97316" : "transparent",
              },
            },
            {
              value: "C",
              label: "C",
              style: {
                backgroundColor: tag === "C" ? "#eab308" : "transparent",
              },
            },
            {
              value: "D",
              label: "D",
              style: {
                backgroundColor: tag === "D" ? "#84cc16" : "transparent",
              },
            },
            {
              value: "E",
              label: "E",
              style: {
                backgroundColor: tag === "E" ? "#06b6d4" : "transparent",
              },
            },
          ]}
        />

        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Pressable onPress={() => setVisible(true)}>
            <AntDesign name="info-circle" size={24} color="#666" />
          </Pressable>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!tag || !name}
          style={{ marginTop: 64 }}
          buttonColor="#7D5A50">
          Add New Task
        </Button>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: "#E5B299",
              padding: 20,
              margin: 20,
              borderRadius: 14,
              gap: 8,
            }}>
            <Text>
              A - The most important tasks, with the highest priority, that you
              must complete today
            </Text>
            <Text>B - Less important tasks, but still very important</Text>
            <Text>C - Tasks with the lowest priority</Text>
            <Text>
              D - Tasks that you can and should delegate to someone else
            </Text>
            <Text>
              E - Tasks you can do only if you have completed everything else
            </Text>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default AddScreen;
