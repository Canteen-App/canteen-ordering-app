import fetchAPI from "@/axios";

export const likeItem = async (itemId?: string) => {
  if (itemId) {
    try {
      const response = await fetchAPI.get(`/review/like/${itemId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const unlikeItem = async (itemId?: string) => {
  if (itemId) {
    const response = await fetchAPI.get(`/review/unlike/${itemId}`);
    return response.data;
  }
};

export const makeReview = async (
  itemId: string,
  data: { rating: number; feedback?: string }
) => {
  const response = await fetchAPI.post(`/review/feedback/${itemId}`, data);
  return response.data;
};
