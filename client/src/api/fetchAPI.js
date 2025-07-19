import React from "react";

const BASE_API_URL = import.meta.env.VITE_API_URL || "https://localhost:5050";

class ApiError extends Error {
  constructor(message, status, statusText, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

const fetchAPI = async (endpoint, options = {}) => {
  const url = `${BASE_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...options,
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    let data = null;
    if (isJson) {
      data = await response.json().catch(() => null);
    } else if (response.status !== 204) {
      data = await response.text().catch(() => null);
    }

    console.log("Fetched data: ", data);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.message ||
        response.statusText ||
        "Unknown error";
      throw new ApiError(message, response.status, response.statusText, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("API Call Error:", error);
      throw error;
    } else {
      console.error("Network or Unexpected Error:", error);
      throw new Error(
        `Network Error: ${error.message || "Could not connect to server."}`
      );
    }
  }
};

export default fetchAPI;
