import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.125, 0.25],
          sheetGrabberVisible: true,
          sheetCornerRadius: 30,
          headerBackButtonDisplayMode: "minimal",
          title: "Details",
        }}
      />
    </Stack>
  );
}
