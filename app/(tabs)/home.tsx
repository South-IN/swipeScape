import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWallpapers } from "@/utils/wallpaperUtils";
import { Photo, Photos, PhotosWithTotalResults } from "pexels";
import WallPaperTray from "@/components/WallPaperTray";

const Home = () => {
  const [wallpapers, setWallpapers] = useState<Photo[]>([]);
  useEffect(() => {
    const getWallpapers = async () => {
      const data = await fetchWallpapers();
      console.log(data);
      setWallpapers(data.photos);
    };
    getWallpapers();
  }, []);
  return (
    <View>
      <Text>Home</Text>
      <WallPaperTray wallpapers={wallpapers} />
    </View>
  );
};

export default Home;
