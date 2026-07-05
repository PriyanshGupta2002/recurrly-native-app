import { clsx } from "clsx";
import { styled } from "nativewind";
import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
const SafeAreaView = styled(RNSafeAreaView);

type SafeViewProps = {
  children: React.ReactNode;
  className?: string;
};

const SafeView = ({ children, className = "" }: SafeViewProps) => {
  return (
    <SafeAreaView className={twMerge(clsx("p-2", className))}>
      {children}
    </SafeAreaView>
  );
};

export default SafeView;
