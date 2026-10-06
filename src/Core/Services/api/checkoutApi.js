import apiClient from "./apiClient";

// ==========================================
// ثبت سفارش
// ==========================================

export const submitCheckout = async ({
  recipient_type = "self",
  address_id,
  discount_code = null,
}) => {
  const requestBody = {
    recipient_type,
    address_id: Number(address_id),
    discount_code,
  };

  console.log(
    "CHECKOUT API REQUEST:",
    JSON.stringify(requestBody, null, 2)
  );

  const response = await apiClient(
    "/checkout/submit",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      data: requestBody,
    }
  );

  console.log(
    "CHECKOUT API RESPONSE:",
    JSON.stringify(response, null, 2)
  );

  return response;
};

// ==========================================
// پرداخت سفارش
// ==========================================

export const payOrder = async (order_id) => {
  const requestBody = {
    order_id: Number(order_id),
  };

  console.log(
    "PAYMENT API REQUEST:",
    JSON.stringify(requestBody, null, 2)
  );

  const response = await apiClient(
    "/checkout/pay",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      data: requestBody,
    }
  );

  console.log(
    "PAYMENT API RESPONSE:",
    JSON.stringify(response, null, 2)
  );

  return response;
};