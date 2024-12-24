import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { getWidthPercentage } from "@/utils/wallpaperUtils";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ImageModal = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState<string>("loading");
  const fileName = item.original.split("/").pop();
  const filePath = `${FileSystem.documentDirectory}/${fileName}`;
  const imageUrl = item.original;
  const handleLoad = () => {
    setStatus("");
  };
  const getImageSize = () => {
    const aspectRatio = Number(item?.width) / Number(item?.height);
    const maxWidth =
      Platform.OS == "web" ? getWidthPercentage(100) : getWidthPercentage(92);
    let height = maxWidth / aspectRatio;
    const width = maxWidth;
    if (aspectRatio < 1) {
      height = height * aspectRatio;
    }
    return {
      width,
      height,
    };
  };
  const handleDownload = async () => {
    setStatus("downloading");
    let uri = await downloadFile();
    ToastAndroid.showWithGravity("Image downloaded", ToastAndroid.SHORT, 25);
    if (uri) {
      setStatus("");
    }
  };
  const handleShare = async () => {
    setStatus("sharing");
    let uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
    }
  };
  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      return uri;
    } catch (error: any) {
      console.log("Error : ", error.message);
      Alert.alert("Image", error.message);
      return null;
    }
  };
  return (
    <BlurView
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      intensity={60}
      className="flex-1 justify-center items-center"
    >
      <Animated.View
        className="absolute top-11 right-3"
        entering={FadeInRight.springify().delay(200)}
      >
        <Pressable
          className=" p-1 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          onPress={() => router.back()}
        >
          <Feather name="x" size={30} color="white" />
        </Pressable>
      </Animated.View>
      <View style={getImageSize()}>
        <View>
          {status === "loading" && (
            <ActivityIndicator size="large" color={"white"} />
          )}
        </View>
        <Image
          transition={100}
          className="rounded-xl"
          style={[getImageSize(), { borderRadius: 20 }]}
          onLoad={handleLoad}
          source={item.original}
        />
      </View>
      <View className="flex flex-row gap-5 m-10">
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status == "downloading" ? (
            <View className="p-4 rounded-2xl">
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          ) : (
            <Pressable
              className="p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              onPress={handleDownload}
            >
              <Feather name="download" size={30} color="white" />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(300)}>
          {status == "sharing" ? (
            <View className="p-4 rounded-2xl">
              <ActivityIndicator size={"small"} color={"white"} />
            </View>
          ) : (
            <Pressable
              className="p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              onPress={handleShare}
            >
              <Feather name="share-2" size={30} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>
    </BlurView>
  );
};

export default ImageModal;
