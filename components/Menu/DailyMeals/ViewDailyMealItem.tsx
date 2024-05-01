import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { likeItem, unlikeItem } from "@/services/review";

const ViewCategoryItem = ({ item }: any) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (item) {
        if (item.likes) {
          setLike(true);
        } else {
          setLike(false);
        }
      }
    };

    getData();
  }, [item]);

  const userLikeItem = async () => {
    setLike(true);
    await likeItem(item.id);
  };

  const userUnlikeItem = async () => {
    setLike(false);
    await unlikeItem(item.id);
  };

  return (
    <View className="w-full p-2 h-[200px] flex">
      <ImageBackground
        className="h-full rounded-xl overflow-hidden "
        source={{ uri: item.imageURL }}
        resizeMode="cover"
      >
        <View className="w-full absolute h-full bg-brown-dark opacity-50" />
        <View className="flex justify-between p-2 flex-row">
          <Text className="text-white font-bold text-lg">
            <AntDesign name="star" size={18} color="#FFB906" />
            5.0
          </Text>
          <Text className="font-bold w-fit h-fit">
            {like ? (
              <AntDesign
                onPress={userUnlikeItem}
                name="heart"
                size={24}
                color="#EE4646"
              />
            ) : (
              <AntDesign
                onPress={userLikeItem}
                name="hearto"
                size={24}
                color="white"
              />
            )}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/(authenticated)/item/${item.id}`)}
          className="flex-grow flex justify-end"
        >
          <View className="p-2">
            <Text className="text-2xl text-white font-bold">
              {item.name} asdf
            </Text>
            <Text className="text-white font-black text-xl">
              Rs {item.price}
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ViewCategoryItem;
