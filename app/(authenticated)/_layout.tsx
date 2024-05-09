import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import TabBar from "@/components/TabBar";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ItemCollectedNotificationProvider } from "@/context/itemsCollectedEvent";
import { CartProvider } from "@/services/cart";

const Layout = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        console.log("Logged Out");
        setUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && user) {
    return (
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY ?? ""}>
        <CartProvider>
          <ItemCollectedNotificationProvider>
            <Stack
              screenOptions={{
                statusBarColor: "#FFE9B1",
                headerShown: false,
              }}
            />
            <TabBar />
          </ItemCollectedNotificationProvider>
        </CartProvider>
      </StripeProvider>
    );
  }

  return <Redirect href="/" />;
};

export default Layout;
