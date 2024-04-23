import fetchAPI from "@/axios";

export const createCustomerAccount = async (uid: string, name: string) => {
  const response = await fetchAPI.post(`/auth/customer`, {
    id: uid,
    name: name,
  });
  console.log(response);
  return response.data;
};

export const getCustomerAccount = async (uid: string) => {
  const response = await fetchAPI.get(`/auth/customer/${uid}`);
  console.log(response);
  return response.data;
};
