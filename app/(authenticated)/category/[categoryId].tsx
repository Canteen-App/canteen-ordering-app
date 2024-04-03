import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ViewCategoryItem from "@/components/Menu/Categories/ViewCategoryItem";
import { FontAwesome } from "@expo/vector-icons";

export default function ViewCategory() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      console.log(categoryId);
      if (categoryId) {
        fetch(`${process.env.EXPO_PUBLIC_API_URL}/category/id/${categoryId}`)
          .then((res) => res.json())
          .then((result) => {
            setCategory(result);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }
    };

    getData();
  }, [categoryId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && category) {
    return (
      <View>
        <View className="flex flex-row items-center p-2">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="chevron-left" size={30} color="#744E15" />
          </TouchableOpacity>
          <Text className="text-3xl font-black text-brown-dark p-2">
            {category.name}
          </Text>
        </View>

        {category.items &&
          category.items.map((item: any, index: number) => (
            <ViewCategoryItem key={index} item={item} />
          ))}
      </View>
    );
  }

  return (
    <View>
      <Text>Error</Text>
    </View>
  );
}
