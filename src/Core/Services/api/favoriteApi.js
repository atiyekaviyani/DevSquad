
import apiClient from "./apiClient";

// دریافت لیست علاقه‌مندی‌های کاربر
export const getFavorites = async () => {
  return apiClient.get("/user/favorites");
};

// افزودن محصول به علاقه‌مندی‌ها
export const addFavorite = async (productId) => {
  if (!productId) {
    throw new Error("شناسه محصول برای افزودن به علاقه‌مندی مشخص نیست.");
  }

  return apiClient.post("/user/favorites", {
    product_id: Number(productId),
  });
};

// حذف علاقه‌مندی
export const deleteFavorite = async (favoriteId) => {
  if (!favoriteId) {
    throw new Error("شناسه علاقه‌مندی مشخص نیست.");
  }

  return apiClient.delete(`/user/favorites/${favoriteId}`);
};
