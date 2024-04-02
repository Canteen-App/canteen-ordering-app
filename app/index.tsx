import { View, Text } from "react-native";
import React from "react";
import DailyMealList from "@/components/Menu/DailyMeals/DailyMealList";

export default function Home() {
  return (
    <View className="bg-red-800">
      <Text>Home</Text>
      <DailyMealList />
    </View>
  );
}
