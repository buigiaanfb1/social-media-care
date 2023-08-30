// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your backend API
});

export const createAccessCode = async (phoneNumber) => {
  try {
    const response = await api.post("/access-code/new", { phoneNumber });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateAccessCode = async (phoneNumber, code) => {
  try {
    const response = await api.post("/access-code/validate", {
      phoneNumber,
      code,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
