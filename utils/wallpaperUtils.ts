import {
  createClient,
  ErrorResponse,
  Photos,
  PhotosWithTotalResults,
} from "pexels";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY
  ? process.env.EXPO_PUBLIC_API_KEY
  : "";
const client = createClient(API_KEY);

export const fetchWallpapers = async (): Promise<Photos> => {
  const data = await client.photos.curated({ per_page: 10 });
  if ("photos" in data) {
    return data;
  }
  console.error("Error fetching wallpapers:", data.error);
  throw new Error(data.error);
};
