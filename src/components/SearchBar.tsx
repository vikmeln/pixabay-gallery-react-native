import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onSearch,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={20} color="#8B91A1" />
        <TextInput
          style={styles.input}
          placeholder="Наприклад: nature, cars..."
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onSearch}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Пошук</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  inputContainer: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E4EC",
    borderRadius: 14,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#1F2937",
  },

  button: {
    height: 50,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#5B6EF5",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
