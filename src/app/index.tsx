import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import EmptyMessage from "../components/EmptyMessage";
import { getImages } from "../services/pixabayApi";
import { PixabayImage } from "../types/pixabay";

const PER_PAGE = 20;

export default function HomeScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<PixabayImage>>(null);
  const [searchText, setSearchText] = useState("nature");
  const [query, setQuery] = useState("nature");
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadImages = async (searchQuery: string, pageNumber: number) => {
    try {
      setLoading(true);
      setError("");
      const result = await getImages(searchQuery, pageNumber);
      setImages(result.images);
      const pages = Math.ceil(result.totalHits / PER_PAGE);
      setTotalPages(Math.max(pages, 1));
    } catch (error) {
      setError("Не вдалося завантажити зображення");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages(query, page);
  }, [query, page]);

  const handleSearch = () => {
    const value = searchText.trim();
    if (value === "") {
      return;
    }
    if (value === query) {
      setPage(1);
      loadImages(value, 1);
      return;
    }
    setPage(1);
    setQuery(value);
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      return;
    }
    setPage(newPage);
    listRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const openImage = (image: PixabayImage) => {
    router.push({
      pathname: "/image/[id]",
      params: {
        id: image.id.toString(),
        image: JSON.stringify(image),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pixabay Gallery</Text>
      </View>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
      />

      {loading && <LoadingIndicator />}

      {!loading && error !== "" && (
        <ErrorMessage message={error} onRetry={() => loadImages(query, page)} />
      )}

      {!loading && error === "" && images.length === 0 && <EmptyMessage />}

      {!loading && error === "" && images.length > 0 && (
        <FlatList
          ref={listRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ImageCard image={item} onPress={() => openImage(item)} />
            </View>
          )}
          ListFooterComponent={
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.navButton, page === 1 && styles.disabledButton]}
                disabled={page === 1}
                onPress={() => changePage(page - 1)}
              >
                <Text
                  style={[
                    styles.navButtonText,
                    page === 1 && styles.disabledText,
                  ]}
                >
                  Назад
                </Text>
              </TouchableOpacity>

              <View style={styles.pageNumbers}>
                {getPageNumbers().map((pageNumber) => (
                  <TouchableOpacity
                    key={pageNumber}
                    style={[
                      styles.pageButton,
                      page === pageNumber && styles.activePageButton,
                    ]}
                    onPress={() => changePage(pageNumber)}
                  >
                    <Text
                      style={[
                        styles.pageText,
                        page === pageNumber && styles.activePageText,
                      ]}
                    >
                      {pageNumber}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  page === totalPages && styles.disabledButton,
                ]}
                disabled={page === totalPages}
                onPress={() => changePage(page + 1)}
              >
                <Text
                  style={[
                    styles.navButtonText,
                    page === totalPages && styles.disabledText,
                  ]}
                >
                  Далі
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf0fd",
    paddingTop: 58,
    paddingHorizontal: 16,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 31,
    fontWeight: "800",
    color: "#1F2937",
  },

  list: {
    paddingBottom: 25,
  },

  row: {
    justifyContent: "space-between",
  },

  gridItem: {
    width: "48.5%",
    marginBottom: 14,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },

  pageNumbers: {
    flexDirection: "row",
    gap: 5,
  },

  pageButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d7d9df",
  },

  activePageButton: {
    backgroundColor: "#5B6EF5",
  },

  pageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },

  activePageText: {
    color: "#FFFFFF",
  },

  navButton: {
    height: 34,
    paddingHorizontal: 11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#d7d9df",
  },

  navButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
  },

  disabledButton: {
    backgroundColor: "#EFF0F4",
  },

  disabledText: {
    color: "#B8BCC7",
  },
});
