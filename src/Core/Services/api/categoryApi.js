import apiClient from "../../Services/api/apiClient";

export const getCategories = async () => {
  const response = await apiClient.get("/categories");

  return response.data;
};