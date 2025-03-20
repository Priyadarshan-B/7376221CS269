import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; 

export const fetchPosts = async (type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/post?type=${type}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${type} posts:`, error);
        return [];
    }
};

export const fetchTopUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/top-user`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top users:", error);
        return [];
    }
};
