import SafeView from "@/components/shared/safe-view";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, Text } from "react-native";

const Settings = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();

      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
      console.error(error);
    }
  };

  return (
    <SafeView className="flex-1 justify-center items-center px-6">
      <Pressable
        onPress={handleSignOut}
        className="w-full h-14 rounded-2xl bg-red-500 items-center justify-center"
      >
        <Text className="text-white text-lg font-bold">Sign Out</Text>
      </Pressable>
    </SafeView>
  );
};

export default Settings;
