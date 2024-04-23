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

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<string | number>
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        className="px-5 h-full w-1/4 flex justify-center"
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
    <GestureHandlerRootView>
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
        renderLeftActions={renderLeftActions}
      >
        <View className="flex mb-5 flex-row w-full justify-between">
          <TouchableOpacity
            onPress={() =>
              router.replace(`/(authenticated)/item/${cartItem.item.id}`)
            }
          >
            <Text className="text-base w-[200px] font-light text-brown-dark">
              {cartItem.item.category.name}
            </Text>
            <Text className="text-2xl w-[200px] font-bold text-brown-dark">
              {cartItem.item.name}
            </Text>
            <Text className="text-xl font-light text-brown-dark">
              Rs {cartItem.item.price}
            </Text>
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
