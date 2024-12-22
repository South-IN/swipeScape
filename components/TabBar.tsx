//@ts-nocheck

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import TabBarButton from "./TabBarButton";

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = "#673ab7";
  const secondaryColor = "#737373";

  return (
    <View
      style={{ flexDirection: "row" }}
      className="bottom-6 justify-between bg-white items-center mx-5 py-4 rounded-full shadow-black drop-shadow-lg"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : secondaryColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;
