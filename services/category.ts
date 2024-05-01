import fetchAPI from "..//axios";

export const getDailyMeals = async () => {
  const response = await fetchAPI.get("/category/DAILY_MEAL");
  return response.data;
};

export const getCategories = async () => {
  const response = await fetchAPI.get("/category/NORMAL_CATEGORY");
  return response.data;
};

export const getCategoryDetails = async (categoryId: string) => {
  const response = await fetchAPI.get(`/category/id/${categoryId}`);
  return response.data;
};

export const getItemDetails = async (itemId: string) => {
  const response = await fetchAPI.get(`/item/info/${itemId}`);
  return response.data;
};
