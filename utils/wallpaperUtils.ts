import {
  createClient,
  ErrorResponse,
  Photos,
  PhotosWithTotalResults,
} from "pexels";
import { Dimensions } from "react-native";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY
  ? process.env.EXPO_PUBLIC_API_KEY
  : "";
const client = createClient(API_KEY);

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const fetchWallpapers = async (query: string): Promise<Photos> => {
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

export const getWidthPercentage = (percentage: number) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};
export const getHeightPercentage = (percentage: number) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};
