import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000/api"

export const userAuthStore = create((set) => ({
    // initail state
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetachingUser: true,

    // functions

    signup: async (username, email, password) => {
        set({ isLoading: true, message: null });

        try {
            const response = await axios.post(`${API_URL}/signup`, {
                username,
                email,
                password,
            });

            const { user, message } = response.data; 

            set({
                user: response.data.user,
                isLoading: false
            });

            return { user, message };

        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error in signing up"
            });

            throw error;
        }
    },

    login: async (username, password) => {
        set({ isLoading: true, message: null, error: null });

        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });

            const { user, message } = response.data;

            set({
                user,
                message,
                isLoading: false,
            });

            return { user, message };
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error in signing in"
            });

            throw error;
        }
    }
}));