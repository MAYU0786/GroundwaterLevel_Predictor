//src/api/authapi.js
import axios from "axios"

// Base API URL - change this to your Spring Boot backend URL
const API_URL = "http://localhost:8080/api"

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Auth API functions
export const authApi = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  },

  // Register new user
  register: async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", { name, email, password })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post("/auth/logout")
      return true
    } catch (error) {
      console.error("Logout error:", error)
      // Still return true to ensure UI logout happens
      return true
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset request failed")
    }
  },

  // Validate auth token
  validateToken: async () => {
    try {
      const response = await api.get("/auth/validate-token")
      return response.data
    } catch (error) {
      throw new Error("Invalid or expired token")
    }
  },
}

export default api

