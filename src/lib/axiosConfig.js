import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable with fallback
  timeout: 90000, // Set a request timeout
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

// Add request interceptor for authorization
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Retrieve token from local storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
//     }
//     return config;
//   },
//   (error) => Promise.reject(error) // Reject request errors
// );

// Add response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data, // Return only the response data
  (error) => {
    // Handle errors globally (e.g., log or show notifications)
    if (error.response) {
      console.error(
        "API Response Error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error); // Reject to propagate the error to the caller
  }
);

export default axiosInstance;
