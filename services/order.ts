import fetchAPI from "@/axios";

export const createPaymentIntent = async (amount: number) => {
  const response = await fetchAPI.post("/order/payment-intent", {
    amount: Math.floor(amount * 100),
  });
  return response.data;
};

export const orderCheckout = async (
  itemList: {
    itemId: any;
    quantity: number;
  }[],
  totalAmount: number
) => {
  const response = await fetchAPI.post("/order/checkout", {
    orderList: itemList,
    currentUserDiplayedAmount: totalAmount,
  });
  return response.data;
};

export const getToPayOrders = async () => {
  const response = await fetchAPI.get("/order/to-pay");
  return response.data;
};

export const getToRecieveOrders = async () => {
  const response = await fetchAPI.get("/order/to-recieve");
  return response.data;
};

export const checkPaymentMade = async (orderId: string) => {
  const response = await fetchAPI.get(`/order/check-payment/${orderId}`);
  return response.data;
};

export const getOrderDetails = async (orderId: string) => {
  const response = await fetchAPI.get(`/order/${orderId}`);
  return response.data;
};

export const getPaymentIntent = async (orderId: string) => {
  const response = await fetchAPI.get(`/order/payment-intent/${orderId}`);
  return response.data;
};

export const showLocalTime = (timeStr: string) => {
  const datetime = new Date(timeStr);
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();

  if (hours > 12) {
    return `${hours - 12}:${minutes} pm`;
  }

  return `${hours}:${minutes} am`;
};