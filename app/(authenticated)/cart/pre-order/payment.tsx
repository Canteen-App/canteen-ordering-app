import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getCartItems, useCart } from "@/services/cart";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  PaymentSheet,
  StripeProvider,
  initPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import {
  checkPaymentMade,
  convertToDateStr,
  createPaymentIntent,
  orderCheckout,
} from "@/services/order";
import { auth } from "@/firebase";
import { getCustomerAccount } from "@/services/customer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PreOrderPayment = () => {
  const { date } = useLocalSearchParams() as { date: string };

  const [items, setItems] = useState<
    { item: any; quantity: number }[] | null | undefined
  >(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const { clearCart } = useCart();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
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

  const makePayment = async () => {
    if (items && date) {
      // Get Order checkout details -> checkoutOrder function from backend
      const orderCheckoutResponse = await orderCheckout(
        items.map((item) => ({
          itemId: item.item.id,
          quantity: item.quantity,
        })),
        totalAmount,
        convertToDateStr(date) // Pass Pre Order Date Str
      );

      clearCart();

      // Stripe Intilises Payment using Payment Intent made in the backend
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

      // Stripe Displays the payment sheet and makes a payment to the respective Payment Intent
      await presentPaymentSheet();

      // Backend Validates payment status of the order's payment intent
      await checkPaymentMade(orderCheckoutResponse.orderDetails.id);

      router.push(
        `/(authenticated)/order/${orderCheckoutResponse.orderDetails.id}`
      );
    }
  };

  return (
    <View className="flex-1">
      <View className="flex  p-2 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.replace("/cart/pre-order/")}>
          <FontAwesome name="chevron-left" size={30} color="#744E15" />
        </TouchableOpacity>
        <FontAwesome name="credit-card" size={35} color="#744E15" />
        <Text className="text-3xl font-black text-brown-dark">
          Pre Order Payment
        </Text>
      </View>

      <View className="p-2 flex-grow">
        <View className="h-[250px] flex-grow">
          <ScrollView className="bg-brown-light px-4 py-2 rounded-2xl overflow-hidden">
            {items &&
              items.map((cartItem, index) => (
                <View key={index}>
                  {cartItem && (
                    <View className="flex flex-row mb-4 justify-between items-end">
                      <View>
                        <Text>{cartItem.item.category.name}</Text>
                        <Text className="text-2xl font-black">
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
        <View className="py-2 flex flex-row justify-between border-b-2">
          <Text className="text-black font-black text-xl">Pre-Order Date</Text>
          <Text className="text-black font-black text-xl">{date}</Text>
        </View>
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

export default PreOrderPayment;
