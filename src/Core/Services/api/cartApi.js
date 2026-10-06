
import apiClient from "./apiClient";

// ==========================================
// دریافت سبد خرید
// ==========================================

export const getCart = async () => {
  return apiClient("/cart", {
    method: "GET",
  });
};

// ==========================================
// افزودن محصول به سبد
// ==========================================

export const addCartItem = async ({
  variant_id,
  quantity = 1,
}) => {
  const formData = new FormData();

  formData.append(
    "variant_id",
    String(variant_id)
  );

  formData.append(
    "quantity",
    String(quantity)
  );

  const response = await apiClient(
    "/cart/items",
    {
      method: "POST",
         data: formData,
    }
  );

  // ========================================
  // ذخیره Guest Token
  // ========================================

  const guestToken =
    response?.data?.guest_token;

  if (guestToken) {
    localStorage.setItem(
      "guestToken",
      guestToken
    );

    console.log(
      "✅ Guest Token saved successfully"
    );
  } else {
    console.warn(
      "⚠️ Guest Token was not returned by API"
    );
  }

  return response;
};

// ==========================================
// حذف آیتم سبد
// ==========================================

export const deleteCartItem = async (
  cartItemId
) => {
  return apiClient(
    `/cart/items/${cartItemId}`,
    {
      method: "DELETE",
    }
  );
};