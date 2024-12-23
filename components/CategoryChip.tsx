import { Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
interface CategoryChipProps {
  item: string;
  isActive: boolean;
  onPress: () => {};
}
const CategoryChip: React.FC<CategoryChipProps> = ({
  item,
  isActive,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue("#fff");
  useEffect(() => {
    scale.value = withTiming(isActive ? 1.2 : 1, { duration: 300 });
    backgroundColor.value = withTiming(isActive ? "#8A2BE2" : "#fff", {
      duration: 300,
    });
  }, [isActive]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
  }));
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        className="m-2 border border-purple-900 rounded-xl p-2"
        style={[isActive ? { marginInline: 10 } : null, animatedStyle]}
      >
        <Text
          className="text-purple-900"
          style={isActive ? { color: "white" } : null}
        >
          {item}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  activeChipText: {
    color: "white",
  },
});
