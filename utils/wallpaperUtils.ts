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
  const query = "wallpaper";
  const data = await client.photos.search({ query, per_page: 80 });
  if ("photos" in data) {
    return data;
  }
  console.error("Error fetching wallpapers:", data.error);
  throw new Error(data.error);
};

export const getImageSize: React.FC<number> = (
  height: number,
  width: number
) => {
  if (width > height) {
    return 220;
  } else if (width < height) {
    return 300;
  } else {
    return 150;
  }
};
