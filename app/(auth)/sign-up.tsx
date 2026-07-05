import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link
        className="text-xl text-white bg-primary p-3"
        href={"/(auth)/sign-in"}
      >
        Sign In
      </Link>
    </View>
  );
};

export default SignUp;
