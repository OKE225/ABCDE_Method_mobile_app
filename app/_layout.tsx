import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.125, 0.25, 0.6],
            sheetGrabberVisible: true,
            sheetCornerRadius: 30,
            headerBackButtonDisplayMode: "minimal",
            title: "Details",
          }}
        />
      </Stack>
    </>
  );
}
