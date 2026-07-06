import { icons } from "@/constants/icons";
import { useUser } from "@clerk/expo";
import React from "react";
import { Image, Text, View } from "react-native";

const Header = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <View className="home-header">
      <View className="home-user">
        <Image
          source={{
            uri: user?.imageUrl ?? "https://ui-avatars.com/api/?name=User",
          }}
          className="home-avatar"
        />

        <Text className="home-user-name"> {user?.fullName}</Text>
      </View>

      <View className="border rounded-full p-4 border-[#C6BFA2]">
        <Image source={icons.plus} className="home-add-icon" />
      </View>
    </View>
  );
};

export default Header;
