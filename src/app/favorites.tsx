import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageCard from "../components/ImageCard";
import LoadingIndicator from "../components/LoadingIndicator";
import EmptyMessage from "../components/EmptyMessage";
import { useFavorites } from "../hooks/useFavorites";
import { PixabayImage } from "../types/pixabay";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loadingFavorites, removeFromFavorites, refreshFavorites } =
    useFavorites();

  useEffect(() => {
    console.log("FAVORITES:", favorites);
  }, [favorites]);

  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
    }, []),
  );

  const openImage = (image: PixabayImage) => {
    router.push({
      pathname: "/image/[id]",
      params: {
        id: image.id.toString(),
        image: JSON.stringify(image),
      },
    });
  };

  if (loadingFavorites) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Обране</Text>
      </View>

      {favorites.length === 0 ? (
        <EmptyMessage
          icon="heart-outline"
          title="У вас ще немає обраних зображень"
          subtitle="Додайте фотографії з галереї, натиснувши кнопку «Додати до обраного»"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ImageCard image={item} onPress={() => openImage(item)} />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromFavorites(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={17} color="#D35454" />
                <Text style={styles.removeButtonText}>Видалити</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingTop: 58,
    paddingHorizontal: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 31,
    fontWeight: "800",
    color: "#1F2937",
  },

  list: {
    paddingBottom: 30,
  },

  row: {
    justifyContent: "space-between",
  },

  item: {
    width: "48.5%",
    marginBottom: 18,
  },

  removeButton: {
    height: 40,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    borderRadius: 11,
    backgroundColor: "#FFF1F1",
    borderWidth: 1,
    borderColor: "#F3D3D3",
  },

  removeButtonText: {
    color: "#D35454",
    fontSize: 14,
    fontWeight: "600",
  },
});
