import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { getCustomerAccount } from "@/services/customer";

const UserModal = () => {
  const [user, setUser] = useState<any>();

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

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View className="p-2 flex-1 flex-col">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={30} color="#744E15" />
      </TouchableOpacity>
      <View className="flex-grow flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-center mt-4">
          User Profile
        </Text>
        <Text className="text-4xl font-black text-center text-brown-dark">
          {user?.name}
        </Text>
        <Text className="text-4xl font-black text-center text-brown-dark">
          {user?.email}
        </Text>
      </View>
      <TouchableOpacity
        onPress={logout}
        className="p-4 rounded-lg bg-brown-dark"
      >
        <Text className="text-xl font-black text-white text-center">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserModal;
