import apiClient from "../../Services/api/apiClient";

export const getBrands = async () => {
  const response = await apiClient.get("/brands");

  return response.data;
};