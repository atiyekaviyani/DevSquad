import apiClient from "./apiClient";

// ----------------------------------
// دریافت آمار داشبورد کاربر
// ----------------------------------

export const getUserStats = async () => {
  return apiClient("/user/stats", {
    method: "GET",
  });
};