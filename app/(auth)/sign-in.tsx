import { colors } from "@/constants/theme";
import { useSignIn } from "@clerk/expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn();

  const isLoaded = fetchStatus !== "fetching";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!isLoaded) return;

    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.password({
        identifier: email,
        password,
      });

      if (signIn.status === "complete") {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert(
        "Sign In Failed",
        err.errors?.[0]?.longMessage ??
          err.errors?.[0]?.message ??
          "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
        >
          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require("@/assets/icons/logo.png")}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />

            <Text
              style={{ color: colors.primary }}
              className="text-2xl font-bold mt-3"
            >
              Recurly
            </Text>

            <Text style={{ color: colors.mutedForeground }} className="text-sm">
              SMART BILLING
            </Text>
          </View>

          {/* Heading */}

          <Text
            style={{ color: colors.foreground }}
            className="text-3xl font-bold text-center mb-2"
          >
            Welcome back
          </Text>

          <Text
            style={{ color: colors.mutedForeground }}
            className="text-base text-center mb-8"
          >
            Sign in to continue managing your subscriptions
          </Text>

          {/* Email */}

          <View className="mb-4">
            <Text
              style={{ color: colors.primary }}
              className="text-base font-semibold mb-2"
            >
              Email
            </Text>

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={colors.mutedForeground}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
              className="rounded-2xl border-2 px-4 py-4"
            />
          </View>

          {/* Password */}

          <View className="mb-6">
            <Text
              style={{ color: colors.primary }}
              className="text-base font-semibold mb-2"
            >
              Password
            </Text>

            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={colors.mutedForeground}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={onSignIn}
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
              className="rounded-2xl border-2 px-4 py-4"
            />
          </View>

          {/* Button */}

          <Pressable
            onPress={onSignIn}
            disabled={loading}
            style={{ backgroundColor: colors.accent }}
            className="h-14 items-center justify-center rounded-2xl mb-8"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-lg font-bold text-white">Sign In</Text>
            )}
          </Pressable>

          {/* Footer */}

          <View className="flex-row justify-center">
            <Text style={{ color: colors.mutedForeground }}>
              New to Recurly?{" "}
            </Text>

            <Link href="/(auth)/sign-up">
              <Text style={{ color: colors.accent }} className="font-semibold">
                Create an account
              </Text>
            </Link>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
