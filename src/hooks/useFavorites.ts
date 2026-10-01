import { useEffect, useState } from "react";
import { PixabayImage } from "../types/pixabay";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../storage/favoritesStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<PixabayImage[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = async (image: PixabayImage) => {
    await addFavorite(image);
    await loadFavorites();
  };

  const removeFromFavorites = async (id: number) => {
    await removeFavorite(id);
    await loadFavorites();
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return {
    favorites,
    loadingFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites: loadFavorites,
  };
}
