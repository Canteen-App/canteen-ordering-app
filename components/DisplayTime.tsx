import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { getDailyMeals } from "@/services/category";

const DisplayTime = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentMeal, setCurrentMeal] = useState();

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
    const updateDateTime = async () => {
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

  function parseTimeString(timeString: string) {
    // Split the time string into hours, minutes, and am/pm
    var timeComponents = timeString.match(/(\d{1,2}):(\d{2})([ap]m)/i);

    if (timeComponents) {
      // Extract hours, minutes, and am/pm from the matched groups
      var hours = parseInt(timeComponents[1]);
      var minutes = parseInt(timeComponents[2]);
      var ampm = timeComponents[3].toLowerCase();

      // Adjust hours if it's in pm
      if (ampm === "pm" && hours < 12) {
        hours += 12;
      }

      // Create a new Date object with today's date and the parsed hours and minutes
      var now = new Date();
      now.setHours(hours);
      now.setMinutes(minutes);
      now.setSeconds(0); // Optional: Set seconds to 0

      return now;
    }
  }

  return (
    <View className="pb-2 flex flex-row justify-between items-start rounded-b-2xl px-4 bg-brown-mid">
      <View>
        <Text className="text-lg text-brown-dark">{currentDate}</Text>
        <Text className="text-3xl font-black text-brown-dark">
          {currentDay}
        </Text>
        <Text className="text-lg text-brown-dark">{currentTime}</Text>
      </View>
    </View>
  );
};

export default DisplayTime;
