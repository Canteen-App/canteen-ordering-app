import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { makeReview } from "@/services/review";

const MakeReviewForm = ({ setOpenReview, item, setReviews }: any) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const createReview = async () => {
    const review = await makeReview(item.id, {
      rating: rating,
      feedback: feedback,
    });

    setReviews((currentReviews: any) => [review, ...currentReviews]);
    setOpenReview(false);
  };

  return (
    <View className="absolute top-0 h-full w-full">
      <View className="relative h-full w-full flex items-center justify-center">
        <View className="w-full absolute h-full bg-brown-dark opacity-50" />
        <KeyboardAvoidingView className="w-[90%] h-[60%] relative p-4 bg-white rounded-xl">
          <TouchableOpacity
            onPress={() => setOpenReview(false)}
            className="w-10 h-10 flex justify-center items-center rounded-full absolute top-2 right-2 bg-red-dark"
          >
            <FontAwesome name="times" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-black">Make Review</Text>
          <View className="flex flex-row justify-between p-2 items-center">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setRating(index + 1)}
                >
                  <Text>
                    {index + 1 <= rating ? (
                      <AntDesign name="star" size={50} color="#FFB906" />
                    ) : (
                      <AntDesign name="staro" size={50} color="grey" />
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
          <TextInput
            multiline={true}
            onChangeText={(text) => setFeedback(text)}
            style={{
              borderWidth: 2,
              borderRadius: 8,
              flex: 1,
              textAlignVertical: "top",
              paddingTop: 10,
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}
          />
          <View className="flex flex-row mt-4">
            <View className="flex-grow" />
            <TouchableOpacity
              onPress={createReview}
              className="bg-yellow roudned-lg p-2"
            >
              <Text>Send Feedback</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default MakeReviewForm;
