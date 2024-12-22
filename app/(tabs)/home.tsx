import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWallpapers } from "@/utils/wallpaperUtils";
import { Photo, Photos, PhotosWithTotalResults } from "pexels";
import WallPaperTray from "@/components/WallPaperTray";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [wallpapers, setWallpapers] = useState<Photo[]>([]);
  useEffect(() => {
    const getWallpapers = async () => {
      const data = await fetchWallpapers();
      setWallpapers(data.photos);
    };
    getWallpapers();
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <Text>Home</Text>
      <View style={{ height: "100%", width: "100%" }}>
        <WallPaperTray wallpapers={wallpapers} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
