import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyMessageProps {
  title?: string;
  subtitle?: string;
  icon?: "images-outline" | "heart-outline";
}

export default function EmptyMessage({
  title = "Зображення не знайдено",
  subtitle = "Спробуйте змінити пошуковий запит",
  icon = "images-outline",
}: EmptyMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={34} color="#5B6EF5" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#EEF0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#8B91A1",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
});
