"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) config.headers["Authorization"] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("auth_token")
    } catch {
      return null
    }
  })

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("user");
        
        if (storedToken) {
          // Only verify token if it exists
          try {
            await api.get("/auth/verify");
            if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              setCurrentUser(parsedUser);
            }
            setToken(storedToken);
          } catch (error) {
            console.log("Token verification failed, clearing auth");
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user");
            setCurrentUser(null);
            setToken(null);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    initializeAuth();
  }, []);
  
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data
      
      localStorage.setItem("auth_token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setToken(token)
      setCurrentUser(user)
      return user
    } catch (error) {
      // Remove references to undefined setError/navigate/from
      throw new Error(error.response?.data?.message || "Login failed")
    }
  }

  const signup = async (email, password, name) => {
    try {
      const response = await api.post("/auth/register", { email, password, name })
      const { token, user } = response.data
      
      localStorage.setItem("auth_token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setToken(token)
      setCurrentUser(user)
      return user
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    setToken(null)
    setCurrentUser(null)
  }

  const resetPassword = async (email) => {
    try {
      await api.post("/auth/forgot-password", { email })
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to reset password")
    }
  }

  const value = {
    currentUser,
    token,
    login,
    signup,
    logout,
    resetPassword,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}