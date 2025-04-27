import { auth } from "@/firebase";
import { Redirect, Slot, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import "../global.css";

const Root = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
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
      <>
        <Slot />
        <Redirect href="/(authenticated)" />
      </>
    );
  }

  return (
    <Stack
      screenOptions={{ headerTitle: "Canteen", headerTitleAlign: "center" }}
    />
  );
};

export default Root;
