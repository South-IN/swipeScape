import { View, Text, ImageBackground } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
//@ts-ignore
import IndexBg from "@/assets/images/index-bg.jpg";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={IndexBg}
        resizeMode="cover"
        className="flex-1 overflow-hidden"
      >
        <SafeAreaView className="flex-1 px-1 justify-between ">
          <View className="flex-1 justify-center items-center">
            <Text className="text-center text-violet-500 font-extrabold text-7xl font-poppins">
              Swipe Scape.
            </Text>
            <Text className="text-center text-purple-700 text-2xl font-poppins">
              Transform your screen, one swipe at a time!
            </Text>
          </View>
          <View className="mx-2 my-6">
            <CustomButton
              onPress={() => router.push("/home")}
              title="Explore"
            />
          </View>
          <StatusBar style="light" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Index;
