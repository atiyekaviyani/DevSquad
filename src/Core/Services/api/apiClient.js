// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log("BASE URL:", BASE_URL);
// const apiClient = async (
//   endpoint,
//   options = {}
// ) => {
// const token =
//   localStorage.getItem("token");

// const guestToken =
//   localStorage.getItem("guestToken");

// console.log("TOKEN:", token);
// console.log("GUEST TOKEN:", guestToken);
//   const response = await fetch(
//     `${BASE_URL}${endpoint}`,
//     {
//       ...options,

//       headers: {
//         Accept: "application/json",

//         ...(token && {
//           Authorization: `Bearer ${token}`,
//         }),

//         ...(guestToken && {
//           "X-Guest-Token": guestToken,
//         }),

//         ...options.headers,
//       },
//     }
//   );

//   const data = await response.json();

//   console.log(
//     "API URL:",
//     `${BASE_URL}${endpoint}`
//   );

//   console.log(
//     "STATUS:",
//     response.status
//   );

//   console.log(
//     "API RESPONSE:",
//     data
//   );

//   if (
//     !response.ok ||
//     !data.status
//   ) {
//     throw new Error(
//       data.message ||
//         "خطایی رخ داده است"
//     );
//   }

//   return data;
// };

// export default apiClient;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("BASE URL:", BASE_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// ======================================
// Request Interceptor
// ======================================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const guestToken = localStorage.getItem("guestToken");

    console.log("TOKEN:", token);
    console.log("GUEST TOKEN:", guestToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (guestToken) {
      config.headers["X-Guest-Token"] = guestToken;
    }

    console.log(
      "API URL:",
      `${BASE_URL}${config.url}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ======================================
// Response Interceptor
// ======================================
apiClient.interceptors.response.use(
  (response) => {
    console.log("STATUS:", response.status);
    console.log("API RESPONSE:", response.data);

    const data = response.data;

    // حفظ رفتار apiClient قبلی
    if (!data?.status) {
      return Promise.reject(
        new Error(
          data?.message || "خطایی رخ داده است"
        )
      );
    }

    // خیلی مهم:
    // قبلاً apiClient خود data را برمی‌گرداند
    return data;
  },

  (error) => {
    console.log(
      "API ERROR:",
      error.response?.data || error.message
    );

    const message =
      error.response?.data?.message ||
      error.message ||
      "خطایی رخ داده است";

    return Promise.reject(
      new Error(message)
    );
  }
);

export default apiClient;