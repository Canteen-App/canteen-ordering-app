import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CategoryCard from "./CategoryCard";
import { getCategories } from "../../../services/category";

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const fetched_categories = await getCategories();
      setCategories(fetched_categories);
    };

    getData();
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
