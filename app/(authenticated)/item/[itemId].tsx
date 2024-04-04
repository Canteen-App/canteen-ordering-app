import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";

const ViewItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      console.log(itemId);
      if (itemId) {
        fetch(`${process.env.EXPO_PUBLIC_API_URL}/item/${itemId}`)
          .then((res) => res.json())
          .then((result) => {
            setItem(result);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }
    };

    getData();
  }, [itemId]);

  const minusCount = () => {
    if (count <= 0) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  if (loading) {
    <View>
      <Text>Loading...</Text>
    </View>;
  }

  return (
    <View className="flex-1 flex-col">
      <View className="flex w-full flex-row items-center p-2">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
      </View>
      <View className="px-4 flex-grow">
        <View className="w-full h-[250px] rounded-lg overflow-hidden">
          <Image className="w-full h-full" source={item?.imageURL} />
        </View>
        <View className="mt-5 flex flex-row justify-between">
          <View className="h-fit">
            <Text className="text-3xl font-black">{item?.name}</Text>
            <Text className="font-bold text-xl">Rs {item?.price}</Text>
          </View>
          <Text className="font-bold w-fit h-fit">
            {like ? (
              <AntDesign
                onPress={() => setLike(false)}
                name="heart"
                size={30}
                color="red"
              />
            ) : (
              <AntDesign
                onPress={() => setLike(true)}
                name="hearto"
                size={30}
                color="grey"
              />
            )}
          </Text>
        </View>
        <Text className="mt-2 text-base">{item?.description}</Text>
      </View>
      <View className="w-full flex flex-row justify-between bg-brown-light p-5 rounded-t-2xl">
        <View className="flex items-center flex-row">
          <TouchableOpacity
            onPress={minusCount}
            className="p-2 flex justify-center items-center rounded-full bg-yellow text-brown-dark w-[40px] h-[40px]"
          >
            <AntDesign color="#744E15" size={24} name="minus" />
          </TouchableOpacity>
          <Text className="font-black px-4 text-4xl text-brown-dark">
            {count}
          </Text>
          <TouchableOpacity
            onPress={() => setCount(count + 1)}
            className="p-2 flex justify-center items-center rounded-full bg-brown-dark text-yellow w-[40px] h-[40px]"
          >
            <AntDesign color="#FFB906" size={24} name="plus" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex flex-row items-center rounded-xl p-4 bg-yellow">
          <FontAwesome size={30} name="shopping-cart" color="#744E15" />
          <Text className="font-black text-brown-dark text-xl pl-4">
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewItem;
