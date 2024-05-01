import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { getItemDetails } from "@/services/category";
import { CategoryType } from "@/types";
import { getCartItemDetails, useCart } from "@/services/cart";
import { likeItem, unlikeItem } from "@/services/review";
import MakeReviewForm from "@/components/Menu/MakeReview";

const ViewItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(1);
  const [cartItemQuantity, setCartItemQuatity] = useState();
  const [openReview, setOpenReview] = useState(false);
  const { cart, addItemToCart } = useCart();
  const [reviews, setReviews] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        if (itemId) {
          // Fetch Item Data
          const fetched_item = await getItemDetails(itemId);
          if (fetched_item.likes) {
            setLike(true);
          } else {
            setLike(false);
          }
          setItem(fetched_item);
          setReviews(fetched_item.reviews);
          setLoading(false);

          // Check if item already in cart
          const cartItemDetails = await getCartItemDetails(itemId);
          if (cartItemDetails) {
            setCartItemQuatity(cartItemDetails);
          }
        }
      };

      getData();
    }, [itemId])
  );

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

  const userLikeItem = async () => {
    setLike(true);
    await likeItem(itemId);
  };

  const userUnlikeItem = async () => {
    setLike(false);
    await unlikeItem(itemId);
  };

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
        <View className="w-full h-[200px] rounded-lg overflow-hidden">
          <Image className="w-full h-full" source={item?.imageURL} />
        </View>
        <View className="mt-2 flex flex-row justify-between">
          <View className="h-fit">
            <Text className="text-base font-light">{item?.category.name}</Text>
            <Text className="text-3xl font-black">{item?.name}</Text>
            <Text className="font-bold text-xl">Rs {item?.price}</Text>
          </View>
          <Text className="font-bold w-fit h-fit">
            {like ? (
              <AntDesign
                onPress={userUnlikeItem}
                name="heart"
                size={30}
                color="#EE4646"
              />
            ) : (
              <AntDesign
                onPress={userLikeItem}
                name="hearto"
                size={30}
                color="grey"
              />
            )}
          </Text>
        </View>
        <Text className="text-base">{item?.description}</Text>
        <View className="mt-2">
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-black font-bold text-lg">
                <AntDesign name="star" size={18} color="#FFB906" />
                5.0
              </Text>
              <Text className="text-xl font-light">Reviews</Text>
            </View>
            <TouchableOpacity
              onPress={() => setOpenReview(true)}
              className="bg-brown-mid p-4 rounded-xl flex flex-row"
            >
              <FontAwesome name="edit" color="#744E15" size={30} />
              <Text className="text-xl font-black pl-2 text-brown-dark">
                Make Review
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-2">
            {reviews &&
              reviews.map((review: any, index: number) => (
                <View key={index} className="bg-brown-light rounded-lg p-2">
                  <View className="flex flex-row items-center">
                    <View className="flex flex-row gap-x-2 flex-grow items-center">
                      <View className="bg-yellow rounded-full">
                        <FontAwesome
                          name="user-circle"
                          size={22}
                          color="#744E15"
                        />
                      </View>
                      <Text className="text-xl font-black text-brown-dark">
                        {review?.customer?.name}
                      </Text>
                    </View>
                    <View className="flex flex-row gap-x-1">
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <View>
                            <Text>
                              {index + 1 <= review.rating ? (
                                <AntDesign
                                  name="star"
                                  size={20}
                                  color="#FFB906"
                                />
                              ) : (
                                <AntDesign
                                  name="staro"
                                  size={20}
                                  color="grey"
                                />
                              )}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                  <Text className="text-lg">{review.feedback}</Text>
                </View>
              ))}
          </View>
        </View>
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

      {openReview && (
        <MakeReviewForm
          setOpenReview={setOpenReview}
          item={item}
          setReviews={setReviews}
        />
      )}
    </View>
  );
};

export default ViewItem;
