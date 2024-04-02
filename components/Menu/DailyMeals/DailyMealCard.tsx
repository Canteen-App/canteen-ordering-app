import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const DailyMealCard = ({ dailyMeal }: any) => {
  return (
    <View>
      <Text>{dailyMeal.name}</Text>
    </View>
  );
};

export default DailyMealCard;
