import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { router } from "expo-router";
import { useCart } from "@/services/cart";
import { ImageBackground } from "expo-image";

const CartItem = ({ rowRefs, cartItem, items, setItems }: any) => {
  const { addItemToCart, deleteCartItem } = useCart();

  const increaseItemQuantity = () => {
    if (items) {
      setItems(
        items.map((arrayItem: { item: { id: string }; quantity: number }) => {
          if (arrayItem.item.id == cartItem.item.id) {
            const newVal = arrayItem.quantity + 1;
            if (newVal >= 1 && newVal < 100) {
              addItemToCart(arrayItem.item.id, 1); // Update Global State
              arrayItem.quantity += 1;
              return arrayItem;
            }
          }
          return arrayItem;
        })
      );
    }
  };

  const decreaseItemQuantity = () => {
    if (items) {
      setItems(
        items.map((arrayItem: { item: { id: string }; quantity: number }) => {
          if (arrayItem.item.id == cartItem.item.id) {
            const newVal = arrayItem.quantity - 1;
            if (newVal >= 1 && newVal < 100) {
              addItemToCart(arrayItem.item.id, -1); // Update Global State
              arrayItem.quantity -= 1;
              return arrayItem;
            }
          }
          return arrayItem;
        })
      );
    }
  };

  const deleteItem = async () => {
    if (items) {
      setItems(
        items.map((arrayItem: { item: { id: string }; quantity: number }) => {
          if (arrayItem != null) {
            if (arrayItem.item.id == cartItem.item.id) {
              deleteCartItem(cartItem.item.id);
              return;
            }
            return arrayItem;
          }
        })
      );
    }
  };

  const styles = StyleSheet.create({
    deleteButton: {
      opacity: 1,
    },
  });

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        className="px-5 h-full w-1/4 flex items-center justify-center"
        style={[styles.deleteButton, { opacity }]}
      >
        <TouchableOpacity
          onPress={deleteItem}
          className="p-2 bg-white rounded-lg"
          style={styles.deleteButton}
        >
          <Text>
            <FontAwesome name="trash" size={35} color="red" />
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (cartItem == null) {
    return <></>;
  }

  return (
    <GestureHandlerRootView className="mb-2">
      <Swipeable
        ref={(ref) => {
          if (ref && !rowRefs.get(cartItem.item.id)) {
            rowRefs.set(cartItem.item.id, ref);
          }
        }}
        onSwipeableWillOpen={() => {
          [...rowRefs.entries()].forEach(([key, ref]) => {
            if (key !== cartItem.item.id && ref) ref.close();
          });
        }}
        renderRightActions={renderRightActions}
      >
        <View className="flex flex-row w-full py-1 gap-2 px-2 bg-brown-light">
          <TouchableOpacity
            className="flex-grow"
            onPress={() =>
              router.replace(`/(authenticated)/item/${cartItem.item.id}`)
            }
          >
            <ImageBackground
              className="rounded-xl overflow-hidden flex-grow"
              source={{ uri: cartItem.item.imageURL }}
            >
              <View className="w-full absolute h-full bg-brown-dark opacity-75" />
              <View className="px-2">
                <Text className="text-base w-[200px] text-white">
                  {cartItem.item.category.name}
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  className="text-xl w-[200px] truncate font-bold text-white"
                >
                  {cartItem.item.name}
                </Text>
                <Text className="text-xl font-light text-white">
                  Rs {cartItem.item.price}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View>
            <View className="flex items-center flex-row">
              <TouchableOpacity
                onPress={() => decreaseItemQuantity()}
                className="flex justify-center items-center rounded-full bg-yellow text-brown-dark p-1"
              >
                <AntDesign color="#744E15" size={20} name="minus" />
              </TouchableOpacity>
              <Text className="font-black px-4 text-3xl text-brown-dark">
                {cartItem.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => increaseItemQuantity()}
                className="flex justify-center items-center rounded-full bg-brown-dark text-yellow p-1"
              >
                <AntDesign color="#FFB906" size={20} name="plus" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl py-1 text-right font-black text-brown-dark">
              Rs{" "}
              {(
                parseInt(cartItem.item.price) * cartItem.quantity
              ).toLocaleString()}
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default CartItem;
