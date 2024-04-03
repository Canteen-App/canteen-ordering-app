import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import DailyMealCard from "./DailyMealCard";

const DailyMealList = () => {
  const [dailyMeals, setDailyMeals] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/category/DAILY_MEAL`)
      .then((res) => res.json())
      .then((result) => {
        setDailyMeals(result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View className="">
      <Text className="font-bold text-2xl px-2 text-brown-dark">Daily Meals</Text>
      <ScrollView horizontal>
        {dailyMeals &&
          dailyMeals.map((dailyMeal, index) => (
            <DailyMealCard key={index} dailyMeal={dailyMeal} />
          ))}
      </ScrollView>
    </View>
  );
};

export default DailyMealList;
