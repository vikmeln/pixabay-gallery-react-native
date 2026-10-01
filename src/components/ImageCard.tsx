import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PixabayImage } from "../types/pixabay";

interface ImageCardProps {
  image: PixabayImage;
  onPress: () => void;
}

export default function ImageCard({ image, onPress }: ImageCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: image.webformatURL }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.author} numberOfLines={1}>
          {image.user}
        </Text>
        <View style={styles.likes}>
          <Ionicons name="heart" size={15} color="#5B6EF5" />
          <Text style={styles.likesText}>{image.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 175,
  },

  info: {
    height: 46,
    paddingHorizontal: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  author: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
    marginRight: 6,
  },

  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  likesText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
});
