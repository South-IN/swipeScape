import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Photo } from "pexels";
import { MasonryFlashList } from "@shopify/flash-list";
interface WallpaperProps {
  wallpapers: Photo[];
}

const WallPaperTray: React.FC<WallpaperProps> = ({ wallpapers }) => {
  return (
    <View className="">
      <MasonryFlashList
        className=""
        data={wallpapers}
        numColumns={2}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <Pressable>
            <Image
              source={{ uri: item.src.medium }}
              className="h-60 w-full rounded-lg"
              resizeMode="cover"
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default WallPaperTray;
