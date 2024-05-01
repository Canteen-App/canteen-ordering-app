import fetchAPI from "@/axios";

export const likeItem = async (itemId: string) => {
  try {
    const response = await fetchAPI.get(`/review/like/${itemId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unlikeItem = async (itemId: string) => {
  const response = await fetchAPI.get(`/review/unlike/${itemId}`);
  return response.data;
};
