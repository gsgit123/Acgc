import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useTAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/tauth/check");
      if (res?.data) {
        set({ authUser: { ...res.data, role: "teacher" } });
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      set({ authUser: null });
      console.error("Error in teacher checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/tauth/signup", data);
      if (res?.data) {
        set({ authUser: { ...res.data, role: "teacher" } });
        toast.success("Teacher account created!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/tauth/login", data);
      if (res?.data) {
        set({ authUser: { ...res.data, role: "teacher" } });
        toast.success("Teacher logged in!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/tauth/logout");
      set({ authUser: null });
      toast.success("Teacher logged out");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },
}));
