import {create} from 'zustand';
import { axiosInstance } from "../lib/axios.js";

import toast from 'react-hot-toast';

export  const useChatStore = create((set,get)=>({
    messages:[],
    isLoadingMessages: false,

    fetchMessages: async (classId) => {
        set({ isLoadingMessages: true });
        try {
            const res = await axiosInstance.get(`/chat/${classId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error("Failed to fetch messages");
            console.error("Error fetching messages:", error);
        } finally {
            set({ isLoadingMessages: false });
        }
    },

    sendMessage: async(classId,data)=>{
        try{
            const res=await axiosInstance.post(`/chat/${classId}/send`, data);
            set((state) => ({
                messages: [...state.messages, res.data.message]
            }));

        }
        catch(error){
            toast.error("Failed to send message");
            console.error("Error sending message:", error);
        }
    }
}));