import apiClient from "./apiClient";

// دریافت اطلاعات پروفایل
export const getProfile = async () => {
  const response = await apiClient("/user/profile", {
    method: "GET",
  });

  return response;
};

// ویرایش پروفایل
export const updateProfile = async (profileData) => {
  const formData = new FormData();

  formData.append("name", profileData.name);
  formData.append("family", profileData.family);
  formData.append("phone", profileData.phone);

  if (profileData.national_code) {
    formData.append(
      "national_code",
      profileData.national_code
    );
  }

  if (profileData.password) {
    formData.append(
      "password",
      profileData.password
    );
  }

  const response = await apiClient(
    "/user/profile/update",
    {
      method: "POST",

      data: formData,
    }
  );

  return response;
};

// دریافت دستگاه‌های فعال
export const getDevices = async () => {
  const response = await apiClient(
    "/user/devices",
    {
      method: "GET",
    }
  );

  return response;
};

// حذف / خروج یک دستگاه
export const revokeDevice = async (deviceId) => {
  const response = await apiClient(
    `/user/devices/${deviceId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};