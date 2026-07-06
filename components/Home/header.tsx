import { HOME_USER } from "@/constants/data";
import { icons } from "@/constants/icons";
import image from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";
const Header = () => {
  return (
    <View className="home-header">
      <View className="home-user">
        <Image source={image.avatar} className="home-avatar" />
        <Text className="home-user-name">{HOME_USER.name}</Text>
      </View>
      <View className="border rounded-full p-4 border-[#C6BFA2]">
        <Image source={icons.plus} className="home-add-icon" />
      </View>
    </View>
  );
};

export default Header;
