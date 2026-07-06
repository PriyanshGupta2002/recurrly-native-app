import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import ListHeading from "../shared/list-heading";
import BalanceSheet from "./balance-sheet";
import Header from "./header";
import SubscripitonCard from "./subscription-card";
import UpcomingSubscriptionList from "./upcoming-subscription-list";

const SubscriptionList = () => {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >("");

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <BalanceSheet />
            <UpcomingSubscriptionList />
            <ListHeading title="All Subscriptions" />
          </>
        }
        data={HOME_SUBSCRIPTIONS}
        renderItem={({ item }) => (
          <SubscripitonCard
            onPress={() =>
              setExpandedSubscriptionId((prev) =>
                prev === item.id ? null : item.id,
              )
            }

            expanded={expandedSubscriptionId === item.id}
            {...item}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className="h-4"></View>}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-20"
      />
    </View>
  );
};

export default SubscriptionList;
