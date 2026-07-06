import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#E5B299",
        },
        headerStyle: {
          backgroundColor: "#E5B299",
          shadowColor: "#BC8A5F",
        },
        headerTintColor: "#582f0e",
        tabBarActiveTintColor: "#582f0e",
        tabBarInactiveTintColor: "#BC8A5F",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Tasks List",
          headerTitle: "ABCDE Method",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Task",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
