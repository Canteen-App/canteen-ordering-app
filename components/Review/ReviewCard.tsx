import { View, Text } from "react-native";
import React from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const ReviewCard = ({ review }: any) => {
  return (
    <View className="bg-brown-light my-1 rounded-lg p-2">
      <View className="flex flex-row items-center">
        <View className="flex flex-row gap-x-2 flex-grow items-center">
          <View className="bg-yellow rounded-full">
            <FontAwesome name="user-circle" size={22} color="#744E15" />
          </View>
          <Text className="text-xl font-black text-brown-dark">
            {review?.customer?.name}
          </Text>
        </View>
        <View className="flex flex-row gap-x-1">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <View key={index}>
                <Text>
                  {index + 1 <= review.rating ? (
                    <AntDesign name="star" size={20} color="#FFB906" />
                  ) : (
                    <AntDesign name="staro" size={20} color="grey" />
                  )}
                </Text>
              </View>
            ))}
        </View>
      </View>
      <Text className="text-lg">{review.feedback}</Text>
    </View>
  );
};

export default ReviewCard;
