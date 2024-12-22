import { View, Text, Pressable } from "react-native";
import { Image, ImageStyle } from "expo-image";
import React from "react";
import { Photo } from "pexels";
import { MasonryFlashList } from "@shopify/flash-list";
import { getImageSize } from "@/utils/wallpaperUtils";
interface WallpaperProps {
  wallpapers: Photo[];
}

const WallPaperTray: React.FC<WallpaperProps> = ({ wallpapers }) => {
  const getImageHeight = (item: Photo) => {
    let { height, width } = item;
    return { height: getImageSize(height, width) };
  };
  return (
    <View className="flex-1">
      <MasonryFlashList
        data={wallpapers}
        numColumns={3}
        estimatedItemSize={200}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="m-1 rounded-xl overflow-hidden"
            onPress={() => console.log("press")}
          >
            <Image
              source={item.src.large}
              style={getImageHeight(item)}
              transition={300}
              className="rounded-xl"
              contentFit="cover"
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default WallPaperTray;
