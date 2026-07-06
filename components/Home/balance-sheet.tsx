import { HOME_BALANCE } from "@/constants/data";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";
import { Text, View } from "react-native";

const BalanceSheet = () => {
  const { amount, nextRenewalDate } = HOME_BALANCE;
  const parsedAmount: string = formatCurrency(amount);
  return (
    <View className="home-balance-card">
      <Text className="home-balance-label">Balance</Text>
      <View className="home-balance-row">
        <Text className="home-balance-amount">{parsedAmount}</Text>
        <Text className="home-balance-date">
          {dayjs(nextRenewalDate).format("MM/DD")}
        </Text>
      </View>
    </View>
  );
};

export default BalanceSheet;
