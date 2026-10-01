import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5B6EF5",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          backgroundColor: "#fffdfd",
          borderTopColor: "#E8EAF0",
          height: 82,
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Галерея",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "images" : "images-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Обране",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="image/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
