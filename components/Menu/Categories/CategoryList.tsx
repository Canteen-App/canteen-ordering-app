import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/category/NORMAL_CATEGORY`)
      .then((res) => res.json())
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View className="">
      <Text className="font-bold text-2xl px-2 text-brown-dark">
        Categories
      </Text>
      <View className="flex-row flex-wrap">
        {categories &&
          categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
      </View>
    </View>
  );
};

export default CategoryList;
