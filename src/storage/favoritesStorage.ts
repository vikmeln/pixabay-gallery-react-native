import AsyncStorage from "@react-native-async-storage/async-storage";
import { PixabayImage } from "../types/pixabay";

const FAVORITES_KEY = "favorites";

export async function getFavorites(): Promise<PixabayImage[]> {
  const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!storedFavorites) {
    return [];
  }
  return JSON.parse(storedFavorites);
}

export async function saveFavorites(favorites: PixabayImage[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function addFavorite(image: PixabayImage): Promise<void> {
  const favorites = await getFavorites();
  const alreadyExists = favorites.some((item) => item.id === image.id);
  if (alreadyExists) {
    return;
  }
  const updatedFavorites = [...favorites, image];
  await saveFavorites(updatedFavorites);
}

export async function removeFavorite(id: number): Promise<void> {
  const favorites = await getFavorites();
  const updatedFavorites = favorites.filter((item) => item.id !== id);
  await saveFavorites(updatedFavorites);
}
