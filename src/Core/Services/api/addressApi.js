import apiClient from "./apiClient";

// ----------------------------------
// دریافت لیست آدرس‌ها
// ----------------------------------

export const getAddresses = async () => {
  return apiClient("/user/addresses", {
    method: "GET",
  });
};

// ----------------------------------
// افزودن آدرس
// ----------------------------------

export const addAddress = async ({
  province_id,
  city_id,
  address,
  postal_code,
  house_number,
}) => {
  const formData = new FormData();

  formData.append("province_id", String(province_id));
  formData.append("city_id", String(city_id));
  formData.append("address", address);
  formData.append("postal_code", postal_code);
  formData.append("house_number", house_number);

  console.log("ADD ADDRESS DATA:", {
    province_id,
    city_id,
    address,
    postal_code,
    house_number,
  });

  return apiClient("/user/addresses", {
    method: "POST",
    data: formData,
  });
};

// ----------------------------------
// ویرایش آدرس
// ----------------------------------

export const updateAddress = async (
  addressId,
  addressData
) => {
  return apiClient(`/user/addresses/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: addressData,
  });
};

// ----------------------------------
// حذف آدرس
// ----------------------------------

export const deleteAddress = async (addressId) => {
  return apiClient(`/user/addresses/${addressId}`, {
    method: "DELETE",
  });
};