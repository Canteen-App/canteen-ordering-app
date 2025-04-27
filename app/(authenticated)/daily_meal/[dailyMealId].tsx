import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ViewDailyMealItem from "@/components/Menu/DailyMeals/ViewDailyMealItem";
import { FontAwesome } from "@expo/vector-icons";
import { getCategoryDetails } from "@/services/category";

export default function ViewDailyMeal() {
  const { dailyMealId } = useLocalSearchParams<{ dailyMealId: string }>();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      if (dailyMealId) {
        const fetched_dailyMeal = await getCategoryDetails(dailyMealId);
        setCategory(fetched_dailyMeal);
        setLoading(false);
      }
    };

    getData();
  }, [dailyMealId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && category) {
    return (
      <View>
        <View className="flex flex-row items-center p-2">
          <TouchableOpacity onPress={() => router.push("/(authenticated)")}>
            <FontAwesome name="chevron-left" size={30} color="#744E15" />
          </TouchableOpacity>
          <Text className="text-3xl font-black text-brown-dark p-2">
            {category.name}
          </Text>
        </View>

        {category.items &&
          category.items.map((item: any, index: number) => (
            <ViewDailyMealItem key={index} item={item} />
          ))}
      </View>
    );
  }

  return (
    <View>
      <Text>Error</Text>
    </View>
  );
}
