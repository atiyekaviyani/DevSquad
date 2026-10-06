import apiClient from "../api/apiClient";

export const getSortOptions = async () => {
  const response = await apiClient.get("/sort-options");

  return response.data;
};