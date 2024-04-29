import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { getCartItems, useCart } from "@/services/cart";
import { router } from "expo-router";
import { checkPaymentMade, orderCheckout } from "@/services/order";
import {
  PaymentSheet,
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { auth } from "@/firebase";
import { getCustomerAccount } from "@/services/customer";
import { onAuthStateChanged } from "firebase/auth";

const PreOrder = () => {
  const [items, setItems] = useState<
    { item: any; quantity: number }[] | null | undefined
  >(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const { clearCart } = useCart();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const customer = await getCustomerAccount(user.uid);
        setUser({ ...customer, ...user });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getData = async () => {
      const cartItems = await getCartItems();
      setItems(cartItems);

      if (cartItems) {
        let total = 0;
        for (let cartItem of cartItems) {
          total += parseInt(cartItem.item.price) * cartItem.quantity;
        }
        setTotalAmount(total);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const updateTotal = () => {
      if (items) {
        let total = 0;
        for (let cartItem of items) {
          if (cartItem) {
            total += parseInt(cartItem.item.price) * cartItem.quantity;
          }
        }
        setTotalAmount(total);
      }
    };

    updateTotal();
  }, [items]);

  const makePayment = async () => {
    if (items) {
      console.log("Checking out Order...");
      const orderCheckoutResponse = await orderCheckout(
        items.map((item) => ({
          itemId: item.item.id,
          quantity: item.quantity,
        })),
        totalAmount
      );

      if (orderCheckoutResponse) {
        clearCart();
      }

      console.log(orderCheckoutResponse);

      console.log("Processing Payment...");

      await initPaymentSheet({
        merchantDisplayName: "Canteen Pvt Ltd",
        paymentIntentClientSecret: orderCheckoutResponse.paymentIntent,
        billingDetailsCollectionConfiguration: {
          email: user.email,
          name: user.name,
          address: PaymentSheet.AddressCollectionMode.NEVER,
        },
        customerId: user.id,
      });

      await presentPaymentSheet();

      const checkPaymentResponse = await checkPaymentMade(
        orderCheckoutResponse.orderDetails.id
      );

      console.log(checkPaymentResponse);

      console.log("Payment Complete");
    }
  };

  return (
    <View className="flex-1">
      <View className="flex  p-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.replace("/cart/")}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <FontAwesome name="credit-card" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">
          Order Payment
        </Text>
      </View>
      <View className="p-2 flex-grow">
        <View className="h-[250px] flex-grow">
          <ScrollView className="bg-brown-light px-4 py-2 rounded-2xl overflow-hidden">
            {items &&
              items.map((cartItem, index) => (
                <View key={index}>
                  {cartItem && (
                    <View className="flex flex-row mb-4 items-end">
                      <View className="flex-grow">
                        <Text>{cartItem.item.category.name}</Text>
                        <Text className="text-2xl w-[250px] font-black ">
                          {cartItem.item.name}
                        </Text>
                      </View>
                      <View>
                        <View className="flex flex-row items-center gap-1">
                          <Text className="font-bold text-lg">
                            {cartItem.item.price}
                          </Text>
                          <FontAwesome name="times" />
                          <Text className="font-bold text-lg">
                            {cartItem.quantity}
                          </Text>
                        </View>
                        <View>
                          <Text className="text-xl font-black">
                            {cartItem.item.price * cartItem.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
      <View className="bg-brown-light px-5 py-2 rounded-t-3xl">
        <View className="py-2 flex flex-row justify-between">
          <Text className="text-brown-dark font-black text-2xl">
            Total Amount
          </Text>
          <Text className="text-brown-dark font-black text-2xl">
            Rs {totalAmount.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={makePayment}
          className="bg-yellow p-3 rounded-lg flex flex-row items-center justify-between"
        >
          <FontAwesome name="credit-card" size={35} color="black" />
          <Text className="text-black font-black text-center text-2xl">
            Make Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreOrder;
