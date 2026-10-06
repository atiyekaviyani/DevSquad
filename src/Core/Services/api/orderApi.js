import apiClient from "./apiClient";

// دریافت لیست سفارش‌های کاربر
export const getOrders = async () => {
  return apiClient("/user/orders", {
    method: "GET",
  });
};

// دریافت جزئیات یک سفارش
export const getOrderDetails = async (orderId) => {
  return apiClient(`/user/orders/${orderId}`, {
    method: "GET",
  });
};

// لغو یک سفارش
export const cancelOrder = async (orderId) => {
  return apiClient(`/user/orders/${orderId}/cancel`, {
    method: "PATCH",
  });
};