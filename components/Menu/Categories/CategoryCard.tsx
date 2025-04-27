import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CategoryCard = ({ category }: any) => {
  return (
    <View className="p-2 w-1/2">
      <TouchableOpacity
        onPress={() => router.push(`/category/${category.id}`)}
        className="bg-brown-light p-6 rounded-lg"
      >
        <Text className="text-2xl font-black text-center text-brown-dark w-fit">
          {category.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryCard;
