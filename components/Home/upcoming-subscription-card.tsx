import { formatCurrency } from "@/lib/utils";
import React, { FC } from "react";
import { Image, Text, View } from "react-native";

const UpcomingSubcriptionCard: FC<UpcomingSubscriptionCardProps> = ({
  daysLeft,
  icon,
  name,
  price,
  currency,
}) => {
  return (
    <View className="upcoming-card">
      <View className="upcoming-row">
        <Image source={icon} className="upcoming-icon" />
        <View>
          <Text className="upcoming-price">{formatCurrency(price)}</Text>
          <Text className="upcoming-meta" numberOfLines={1}>
            {daysLeft > 1 ? `${daysLeft} days left` : "Last Day"}
          </Text>
        </View>
      </View>

      <Text className="upcoming-name" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default UpcomingSubcriptionCard;
