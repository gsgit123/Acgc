import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
const BASE_URL="http://localhost:5001";


export const useSAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,

    isCheckingAuth:true,

    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/sauth/check");

            set({authUser:res.data});
        }catch(error){
            set({authUser:null});
            console.log("error in checkauth: ",error);
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/sauth/signup", data);
          if (res?.data) {
            set({ authUser: res.data });
            toast.success("Account Created Successfully");
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
          const res = await axiosInstance.post("/sauth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

    logout:async()=>{
        try{
            await axiosInstance.post("/sauth/logout");
            set({authUser:null})
            toast.success("Logged out successfully")
        }catch(error){
            toast.error(error.response.data.message)
        }

    },
      
    


}));  