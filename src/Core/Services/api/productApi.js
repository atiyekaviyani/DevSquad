import apiClient from "../api/apiClient";

// دریافت محصولات
export const getProducts = async (params = {}) => {
  const response = await apiClient.get("/products", {
    params,
  });

  return response.data;
};

// دریافت جزئیات یک محصول
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);

  return response.data;
};

// ثبت بازدید محصول
export const increaseProductView = async (id) => {
  const response = await apiClient.post(`/products/${id}/view`);

  return response.data;
};