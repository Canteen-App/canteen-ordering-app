import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ViewCategoryItem = ({ item }: any) => {
  const [like, setLike] = useState(false);

  return (
    <View className="w-1/2 p-2 h-[250px] flex">
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
                onPress={() => setLike(false)}
                name="heart"
                size={24}
                color="red"
              />
            ) : (
              <AntDesign
                onPress={() => setLike(true)}
                name="hearto"
                size={24}
                color="white"
              />
            )}
          </Text>
        </View>
        <TouchableOpacity className="flex-grow flex justify-end">
          <View className="p-2">
            <Text className="text-2xl text-white font-bold">{item.name}</Text>
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
