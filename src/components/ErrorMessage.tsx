import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Спробувати ще раз</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#222222",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
