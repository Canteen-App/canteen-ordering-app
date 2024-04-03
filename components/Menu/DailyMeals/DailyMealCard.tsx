import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DailyMealCard = ({ dailyMeal }: any) => {
  return (
    <View className="p-2 w-[180px]">
      <TouchableOpacity
        onPress={() => router.push(`/daily_meal/${dailyMeal.id}`)}
        className="bg-brown-light p-2 rounded-lg"
      >
        <Text className="text-2xl font-black text-brown-dark w-fit">
          {dailyMeal.name}
        </Text>
        <Text className="text-brown-dark w-fit">
          {dailyMeal?.startTime} - {dailyMeal?.endTime}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DailyMealCard;
