import fetchAPI from "@/axios";

export const createPaymentIntent = async (amount: number) => {
  const response = await fetchAPI.post("/order/payment-intent", {
    amount: Math.floor(amount * 100),
  });
  return response.data;
};
