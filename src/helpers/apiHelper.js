import axios from "axios";
import { baseURL } from "../API/url";

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to handle API calls
const apiHelper = {
  get: async (url, params = {}) => {
    try {
      const response = await apiClient.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },

  put: async (url, data = {}) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  },

  delete: async (url, params = {}) => {
    try {
      const response = await apiClient.delete(url, { params });
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  },
  getProtected: async (url, params = {}, method = "get") => {
    try {
      const response = await apiClient({
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: params,
      });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export default apiHelper;
