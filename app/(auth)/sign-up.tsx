import { colors } from "@/constants/theme";
import { useSignUp } from "@clerk/expo";
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

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<any>({});

  // Step 1: Initial signup with email and password
  const handleSignUp = async () => {
    try {
      const { error } = await signUp.password({
        emailAddress,
        password,
      });

      if (error) {
        setErrors({ submit: error.message });
        Alert.alert(
          "Sign Up Failed",
          error.message || "An error occurred during sign up.",
        );
        return;
      }

      // Send verification code to email
      await signUp.verifications.sendEmailCode();
    } catch (err: any) {
      Alert.alert(
        "Sign Up Failed",
        err.message || "An error occurred during sign up.",
      );
    }
  };

  // Step 2: Verify email with code
  const handleVerify = async () => {
    try {
      const result = await signUp.verifications.verifyEmailCode({ code });

      if (signUp.status === "complete") {
        await signUp.finalize();
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Verification Failed",
          "Please check your verification code and try again.",
        );
      }
    } catch (err: any) {
      Alert.alert(
        "Verification Failed",
        err.message || "Invalid verification code.",
      );
    }
  };

  // Verification screen
  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View
        style={{ backgroundColor: colors.background }}
        className="flex-1 justify-center px-6"
      >
        {/* Logo and Branding */}
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
          Verify your email
        </Text>

        {/* Subheading */}
        <Text
          style={{ color: colors.mutedForeground }}
          className="text-base text-center mb-8"
        >
          We&apos;ve sent a verification code to {emailAddress}
        </Text>

        {/* Verification Code Input */}
        <View className="mb-6">
          <Text
            style={{ color: colors.primary }}
            className="text-base font-semibold mb-2"
          >
            Verification Code
          </Text>
          <TextInput
            placeholder="Enter verification code"
            placeholderTextColor={colors.mutedForeground}
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.card,
            }}
            className="rounded-2xl border-2 px-4 py-3"
          />
        </View>

        {/* Verify Button */}
        <Pressable
          onPress={handleVerify}
          disabled={fetchStatus === "fetching" || !code}
          style={{
            backgroundColor:
              fetchStatus === "fetching" || !code
                ? colors.mutedForeground
                : colors.accent,
          }}
          className="h-14 items-center justify-center rounded-2xl mb-4"
        >
          {fetchStatus === "fetching" ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-lg font-bold text-white">Verify</Text>
          )}
        </Pressable>

        {/* Resend Code Button */}
        <Pressable
          onPress={() => signUp.verifications.sendEmailCode()}
          style={{ borderColor: colors.accent }}
          className="h-14 items-center justify-center rounded-2xl border-2"
        >
          <Text style={{ color: colors.accent }} className="text-lg font-bold">
            Resend Code
          </Text>
        </Pressable>
      </View>
    );
  }

  // Initial signup form
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

          <Text
            style={{ color: colors.foreground }}
            className="text-3xl font-bold text-center mb-2"
          >
            Create account
          </Text>

          <Text
            style={{ color: colors.mutedForeground }}
            className="text-base text-center mb-8"
          >
            Start managing your subscriptions today
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
              value={emailAddress}
              onChangeText={setEmailAddress}
              autoCapitalize="none"
              keyboardType="email-address"
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
              style={{
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
              className="rounded-2xl border-2 px-4 py-4"
            />
          </View>

          <Pressable
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching" || !emailAddress || !password}
            style={{
              backgroundColor:
                fetchStatus === "fetching" || !emailAddress || !password
                  ? colors.mutedForeground
                  : colors.accent,
            }}
            className="h-14 rounded-2xl items-center justify-center mb-8"
          >
            {fetchStatus === "fetching" ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-lg font-bold text-white">Sign Up</Text>
            )}
          </Pressable>

          <View className="flex-row justify-center">
            <Text style={{ color: colors.mutedForeground }}>
              Already have an account?{" "}
            </Text>

            <Link href="/(auth)/sign-in">
              <Text style={{ color: colors.accent }} className="font-semibold">
                Sign In
              </Text>
            </Link>
          </View>

          <View nativeID="clerk-captcha" />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
