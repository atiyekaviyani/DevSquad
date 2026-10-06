import apiClient from "./apiClient";


export const getFavorites = async () => {
  return apiClient("/user/favorites");
};


export const addFavorite = async (productId) => {
  return apiClient("/user/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: productId,
    }),
  });
};


export const deleteFavorite = async (favoriteId) => {
  return apiClient(`/user/favorites/${favoriteId}`, {
    method: "DELETE",
  });
};