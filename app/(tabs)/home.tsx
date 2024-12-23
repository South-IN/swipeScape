import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fetchWallpapers } from "@/utils/wallpaperUtils";
import { Photo } from "pexels";
import WallPaperTray from "@/components/WallPaperTray";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { WALLPAPER_CATEGORIES } from "@/constants/WallPaperCategories";
import CategoryChip from "@/components/CategoryChip";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [wallpapers, setWallpapers] = useState<Photo[]>([]);
  const inputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const getWallpapers = async () => {
      const data = await fetchWallpapers("wallpaper");
      setWallpapers(data.photos);
    };
    getWallpapers();
  }, []);
  const handleSearch = async () => {
    if (searchQuery === "") {
      Alert.alert("Error!", "Input Field for search is empty", [
        { text: "OK" },
      ]);
      return;
    }
    const data = await fetchWallpapers(searchQuery);
    setWallpapers(data.photos);
  };
  const onCategoryChange = async (item: string) => {
    console.log(item);
    const query = item === "All" ? "wallpaper" : item;
    setActiveCategory(item);
    const data = await fetchWallpapers(query);
    setWallpapers(data.photos);
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex justify-center items-center h-20 w-full rounded-full flex-row my-3 p-4 bg-gray-200">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 h-10 p-1 text-purple-900 font-poppins"
          placeholder="Search"
          placeholderTextColor={"purple"}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleSearch}>
          <Ionicons name="search-circle-outline" size={44} color="purple" />
        </Pressable>
      </View>
      <View className="">
        <FlatList
          data={WALLPAPER_CATEGORIES}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CategoryChip
              item={item}
              isActive={item === activeCategory}
              onPress={() => onCategoryChange(item)}
            />
          )}
        />
      </View>
      <View style={{ height: "100%", width: "100%" }}>
        <WallPaperTray wallpapers={wallpapers} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
