import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { getItemDetails } from "@/services/category";
import { CategoryType } from "@/types";
import { getCartItemDetails, useCart } from "@/services/cart";

const ViewItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(1);
  const [cartItemQuantity, setCartItemQuatity] = useState();

  const { cart, addItemToCart } = useCart();

  useEffect(() => {
    const getData = async () => {
      if (itemId) {
        // Fetch Item Data
        const fetched_item = await getItemDetails(itemId);
        setItem(fetched_item);
        setLoading(false);

        // Check if item already in cart
        const cartItemDetails = await getCartItemDetails(itemId);
        if (cartItemDetails) {
          setCartItemQuatity(cartItemDetails);
        }
      }
    };

    getData();
  }, [itemId]);

  useEffect(() => {
    const checkCart = async () => {
      // Check if item already in cart
      const cartItemDetails = await getCartItemDetails(itemId);
      if (cartItemDetails) {
        setCartItemQuatity(cartItemDetails);
      } else {
        setCartItemQuatity(undefined);
      }
    };

    checkCart();
  }, [cart]);

  const minusCount = () => {
    if (count <= 1) {
      return;
    } else {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    if (count >= 100) {
      return;
    } else {
      setCount(count + 1);
    }
  };

  if (loading) {
    <View>
      <Text>Loading...</Text>
    </View>;
  }

  const goBack = () => {
    if (item.category.categoryType == CategoryType.DAILY_MEAL) {
      router.push(`/(authenticated)/daily_meal/${item.category.id}`);
    }
    if (item.category.categoryType == CategoryType.NORMAL_CATEGORY) {
      router.push(`/(authenticated)/category/${item.category.id}`);
    }
  };
  return (
    <View className="flex-1 flex-col">
      <View className="flex w-full flex-row items-center p-2">
        <TouchableOpacity onPress={goBack}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
      </View>
      <View className="px-4 flex-grow">
        <View className="w-full h-[250px] rounded-lg overflow-hidden">
          <Image className="w-full h-full" source={item?.imageURL} />
        </View>
        <View className="mt-5 flex flex-row justify-between">
          <View className="h-fit">
            <Text className="text-base font-light">{item?.category.name}</Text>
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
        {item && (
          <>
            {cartItemQuantity ? (
              <>
                <View>
                  <Text className="font-black text-4xl text-brown-dark">
                    {cartItemQuantity}
                  </Text>
                  <Text className="font-bold">Items already in Cart</Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.navigate("/cart/")}
                  className="flex flex-row items-center rounded-xl p-4 bg-yellow"
                >
                  <AntDesign name="shoppingcart" size={35} color="#744E15" />
                  <Text className="font-black text-brown-dark text-xl pl-4">
                    View Cart
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
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
                    onPress={addCount}
                    className="p-2 flex justify-center items-center rounded-full bg-brown-dark text-yellow w-[40px] h-[40px]"
                  >
                    <AntDesign color="#FFB906" size={24} name="plus" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => addItemToCart(itemId, count)}
                  className="flex flex-row items-center rounded-xl p-4 bg-yellow"
                >
                  <AntDesign name="shoppingcart" size={35} color="#744E15" />
                  <Text className="font-black text-brown-dark text-xl pl-4">
                    Add To Cart
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ViewItem;
