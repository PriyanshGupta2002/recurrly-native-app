import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link
        href={"/onboarding"}
        className="mt-4 rounded p-3 bg-primary text-white "
      >
        Go to Onboarding
      </Link>
      <Link
        href={"/(auth)/sign-in"}
        className="mt-4 rounded p-3 bg-primary text-white "
      >
        Go to Sign In
      </Link>
      <Link
        href={"/(auth)/sign-up"}
        className="mt-4 rounded p-3 bg-primary text-white "
      >
        Go to Sign Up
      </Link>
      <Link
        className="mt-4 rounded p-3 bg-primary text-white "

        href={"/subscriptions/spotify"}
      >
        Spotify Subscriptions
      </Link>
      <Link
        className="mt-4 rounded p-3 bg-primary text-white "

        href={{
          pathname: "/subscriptions/[id]",
          params: {
            id: "claude",
          },
        }}
      >
        Claude Max Subscriptions
      </Link>
    </View>
  );
}
