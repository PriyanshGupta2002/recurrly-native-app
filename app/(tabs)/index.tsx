import SubscriptionList from "@/components/Home/subscription-list";
import SafeView from "@/components/shared/safe-view";

export default function App() {
  return (
    <SafeView className="flex-1 gap-4 bg-background">
      <SubscriptionList />
    </SafeView>
  );
}
