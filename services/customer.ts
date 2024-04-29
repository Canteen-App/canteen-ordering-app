import fetchAPI from "@/axios";

export const createCustomerAccount = async (uid: string, name: string) => {
  const response = await fetchAPI.post(`/auth/customer`, {
    id: uid,
    name: name,
  });
  return response.data;
};

export const getCustomerAccount = async (uid: string) => {
  const response = await fetchAPI.get(`/auth/customer/${uid}`);
  return response.data;
};
