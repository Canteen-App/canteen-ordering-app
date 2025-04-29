import { getDailyMeals } from "@/services/category";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import DailyMealCard from "./DailyMealCard";

const DailyMealList = () => {
  const [dailyMeals, setDailyMeals] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      console.log("Hi")
      const fetched_categories = await getDailyMeals();
      console.log(fetched_categories);
      setDailyMeals(fetched_categories);
    };

    getData();
  }, []);
  return (
    <View className="">
      <Text className="font-bold text-2xl px-2 text-brown-dark">
        Daily Meals
      </Text>
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
