import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import DailyMealList from "@/components/Menu/DailyMeals/DailyMealList";
import CategoryList from "@/components/Menu/Categories/CategoryList";
import { FontAwesome } from "@expo/vector-icons";
import DisplayTime from "@/components/DisplayTime";

export default function Home() {
  return (
    <View>
      <DisplayTime />
      <DailyMealList />
      <CategoryList />
    </View>
  );
}
