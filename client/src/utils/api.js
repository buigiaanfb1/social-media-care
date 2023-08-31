// src/utils/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // Base URL for your backend API
});

export const createAccessCode = async (phoneNumber) => {
  try {
    const response = await api.post("/api/access-code/new", { phoneNumber });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const validateAccessCode = async (phoneNumber, code) => {
  try {
    const response = await api.post("/api/access-code/validate", {
      phoneNumber,
      code,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const validateUserLoggedIn = async (accessToken, phoneNumber) => {
  try {
    await api.post("/api/me/validate", {
      access_token: accessToken,
      phoneNumber,
    });
    return { loggedIn: true };
  } catch (error) {
    return { loggedIn: false };
  }
};
