
import apiClient from "./apiClient";

// ----------------------------------
// دریافت لیست استان‌ها
// ----------------------------------

export const getProvinces = async () => {
  return await apiClient("/provinces", {
    method: "GET",
  });
};

// ----------------------------------
// دریافت شهرهای یک استان
// ----------------------------------

export const getProvinceCities = async (
  provinceId
) => {
  return await apiClient(
    `/provinces/${provinceId}/cities`,
    {
      method: "GET",
    }
  );
};