const axios = require("axios");
const cache = require("../../config/cache");
const authToken = require("../../middleware/auth");

const url = "http://20.244.56.144/test";

const getUser = async (req, res) => {
    try {
        const cacheData = cache.get("topUsers");
        if (cacheData) return res.json(cacheData);

        const token = await authToken();
        console.log("Fetched auth token:", token);

        const { data: usersResponse } = await axios.get(`${url}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fetched users:", usersResponse);

        const users = usersResponse.users;
        if (!users) {
            throw new Error("Users data not found in the response");
        }

        const PostCounts = {};

        await Promise.all(
            Object.keys(users).map(async (userId) => {
                try {
                    console.log(`Fetching posts for user ${userId} (${users[userId]})`);
                    const { data: posts } = await axios.get(`${url}/users/${userId}/posts`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log(`Posts for user ${userId}:`, posts);

                    PostCounts[users[userId]] = posts.length; 
                } catch (error) {
                    console.error(`Error fetching posts for user ${userId}:`, error.response?.data || error.message);
                }
            })
        );

        console.log("PostCounts:", PostCounts);

        const topUsers = Object.entries(PostCounts)
            .sort((a, b) => b[1] - a[1]) 
            .slice(0, 5)
            .map(([name, count]) => ({ name, count })); 

        console.log("Top users:", topUsers);

        cache.set("topUsers", topUsers, 300); 
        res.json(topUsers);
    } catch (err) {
        console.error("Error fetching top users:", err.response?.data || err.message);
        res.status(500).json({ error: "Error fetching data" });
    }
};

module.exports = { getUser };