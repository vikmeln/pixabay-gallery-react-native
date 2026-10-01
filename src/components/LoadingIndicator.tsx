import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Завантаження...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
