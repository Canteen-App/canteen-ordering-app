import fetchAPI from "..//axios";

export const getDailyMeals = async () => {
  try {
    const response = await fetchAPI.get("/category/DAILY_MEAL");
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
  }
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
  const response = await fetchAPI.get(`/item/${itemId}`);
  return response.data;
};
