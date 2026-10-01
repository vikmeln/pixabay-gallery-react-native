import { PIXABAY_API_KEY, PIXABAY_API_URL } from "../constants/api";
import { PixabayImage } from "../types/pixabay";

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

export interface ImagesResult {
  images: PixabayImage[];
  totalHits: number;
}

export async function getImages(
  query: string,
  page: number = 1,
): Promise<ImagesResult> {
  const url =
    `${PIXABAY_API_URL}` +
    `?key=${PIXABAY_API_KEY}` +
    `&q=${encodeURIComponent(query)}` +
    `&image_type=photo` +
    `&page=${page}` +
    `&per_page=20`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Помилка при завантаженні зображень");
  }

  const data: PixabayResponse = await response.json();

  return {
    images: data.hits,
    totalHits: data.totalHits,
  };
}
