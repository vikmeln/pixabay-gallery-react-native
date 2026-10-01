import { useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PixabayImage } from "../../types/pixabay";
import { useFavorites } from "../../hooks/useFavorites";

export default function ImageDetailsScreen() {
  const params = useLocalSearchParams();
  const image: PixabayImage = JSON.parse(params.image as string);
  const { addToFavorites, removeFromFavorites, isFavorite, loadingFavorites } =
    useFavorites();
  const favorite = isFavorite(image.id);
  const handleFavorite = async () => {
    if (favorite) {
      await removeFromFavorites(image.id);
    } else {
      await addToFavorites(image);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image.largeImageURL }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.authorLabel}>Автор</Text>
        <Text style={styles.author}>{image.user}</Text>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <View style={styles.labelContainer}>
            <Ionicons name="eye-outline" size={19} color="#5B6EF5" />
            <Text style={styles.label}>Перегляди</Text>
          </View>
          <Text style={styles.value}>{image.views.toLocaleString()}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.labelContainer}>
            <Ionicons name="heart-outline" size={19} color="#5B6EF5" />
            <Text style={styles.label}>Лайки</Text>
          </View>
          <Text style={styles.value}>{image.likes.toLocaleString()}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.labelContainer}>
            <Ionicons name="download-outline" size={19} color="#5B6EF5" />
            <Text style={styles.label}>Завантаження</Text>
          </View>
          <Text style={styles.value}>{image.downloads.toLocaleString()}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
        onPress={handleFavorite}
        disabled={loadingFavorites}
        activeOpacity={0.85}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={21}
          color={favorite ? "#5B6EF5" : "#FFFFFF"}
        />

        <Text
          style={[
            styles.favoriteButtonText,
            favorite && styles.favoriteButtonTextActive,
          ]}
        >
          {favorite ? "В обраному" : "Додати до обраного"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  content: {
    padding: 16,
    paddingTop: 22,
    paddingBottom: 35,
  },

  imageContainer: {
    width: "100%",
    height: 390,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  infoCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,

    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  authorLabel: {
    fontSize: 13,
    color: "#8B91A1",
    marginBottom: 4,
  },

  author: {
    fontSize: 23,
    fontWeight: "700",
    color: "#1F2937",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECEEF3",
    marginVertical: 16,
  },

  infoRow: {
    minHeight: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  label: {
    fontSize: 16,
    color: "#62697A",
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  favoriteButton: {
    marginTop: 18,
    height: 54,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#5B6EF5",
  },

  favoriteButtonActive: {
    backgroundColor: "#EEF0FF",
    borderWidth: 1,
    borderColor: "#CDD3FF",
  },

  favoriteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  favoriteButtonTextActive: {
    color: "#5B6EF5",
  },
});
