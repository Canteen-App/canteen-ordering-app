import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DailyMealCard from "./DailyMealCard";

const DailyMealList = () => {
  const [dailyMeals, setDailyMeals] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/category/DAILY_MEAL`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDailyMeals(result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View>
      <Text className="font-bold text-xl">Daily Meals</Text>
      {dailyMeals &&
        dailyMeals.map((dailyMeal, index) => (
          <DailyMealCard key={index} dailyMeal={dailyMeal} />
        ))}
    </View>
  );
};

export default DailyMealList;
