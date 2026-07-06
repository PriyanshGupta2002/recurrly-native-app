import { UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import React from "react";
import { FlatList, Text, View } from "react-native";
import ListHeading from "../shared/list-heading";
import UpcomingSubcriptionCard from "./upcoming-subscription-card";

const UpcomingSubscriptionList = () => {
  return (
    <View>
      <ListHeading title="Upcoming" />
      <FlatList
        data={UPCOMING_SUBSCRIPTIONS}
        renderItem={({ item }) => <UpcomingSubcriptionCard {...item} />}
        keyExtractor={(item) => item.id}
        horizontal

        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="home-empty-space">No upcoming renewals yet.</Text>
        }
      />
    </View>
  );
};

export default UpcomingSubscriptionList;
