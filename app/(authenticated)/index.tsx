import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DailyMealList from "@/components/Menu/DailyMeals/DailyMealList";
import CategoryList from "@/components/Menu/Categories/CategoryList";

export default function Home() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Function to update current date, time, and day
    const updateDateTime = () => {
      const now = new Date();
      const month = months[now.getMonth()];
      const dayOfMonth = now.getDate();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dayOfWeek = days[now.getDay()];

      setCurrentDate(`${month} ${dayOfMonth}`);
      setCurrentTime(`${time}`);
      setCurrentDay(dayOfWeek);

      // Calculate the time until the next minute
      const secondsUntilNextMinute = 60 - now.getSeconds();

      // Schedule the next update to occur precisely at the next minute
      setTimeout(updateDateTime, secondsUntilNextMinute * 1000);
    };

    // Call updateDateTime function initially
    updateDateTime();
  }, []);

  return (
    <View>
      <View className="bg-brown-light rounded-b-3xl p-4 pt-0">
        <View>
          <Text className="text-lg text-brown-dark">{currentDate}</Text>
          <Text className="text-3xl font-black text-brown-dark">
            {currentDay}
          </Text>
          <Text className="text-lg text-brown-dark">{currentTime}</Text>
        </View>
      </View>
      <DailyMealList />
      <CategoryList />
    </View>
  );
}
