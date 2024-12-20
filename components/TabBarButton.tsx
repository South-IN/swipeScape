import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
interface TabBarButtonProps {
  key: string;
  isFocused: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  label: string;
  routeName: string;
  color: string;
}

const TabBarButton = (props: TabBarButtonProps) => {
  const scale = useSharedValue(0);
  const { isFocused, label, routeName, color } = props;

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused, scale]);

  const Icons = {
    home: () => <Ionicons name="home-outline" size={24} color={color} />,
    settings: () => <AntDesign name="setting" size={24} color={color} />,
  };
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [0.8, 1.2]);
    return {
      transform: [{ scale: scaleValue }],
    };
  });
  return (
    <Pressable {...props} className="flex-1 items-center justify-center gap-1">
      <Animated.View style={[animatedIconStyle]}>
        {Icons[routeName]({
          color,
        })}
      </Animated.View>
      <Text
        style={{
          color,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;
