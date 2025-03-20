const axios = require("axios");
const cache = require("../../config/cache");
const authToken = require('../../middleware/auth');

const url = "http://20.244.56.144/test";

const getPosts = async (req, res) => {
    try {
        const { type } = req.query;
        if (!["popular", "latest"].includes(type)) {
            return res.status(400).json({ error: "Invalid type parameter" });
        }

        const cacheData = cache.get(type);
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

        let allPosts = [];

        await Promise.all(
            Object.keys(users).map(async (userId) => {
                try {
                    console.log(`Fetching posts for user ${userId} (${users[userId]})`);
                    const { data: postsResponse } = await axios.get(`${url}/users/${userId}/posts`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log(`Posts for user ${userId}:`, postsResponse);

                    if (postsResponse.posts && Array.isArray(postsResponse.posts)) {
                        allPosts = [...allPosts, ...postsResponse.posts];
                    } else {
                        console.error(`No posts found for user ${userId}`);
                    }
                } catch (error) {
                    console.error(`Error fetching posts for user ${userId}:`, error.response?.data || error.message);
                }
            })
        );

        console.log("All posts:", allPosts);

        if (type === "popular") {
            const commentCounts = {};

            await Promise.all(
                allPosts.map(async (post) => {
                    try {
                        console.log(`Fetching comments for post ${post.id}`);
                        const { data: commentsResponse } = await axios.get(`${url}/posts/${post.id}/comments`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        console.log(`Comments for post ${post.id}:`, commentsResponse);

                        if (commentsResponse.comments && Array.isArray(commentsResponse.comments)) {
                            commentCounts[post.id] = commentsResponse.comments.length;
                        } else {
                            console.error(`No comments found for post ${post.id}`);
                        }
                    } catch (error) {
                        console.error(`Error fetching comments for post ${post.id}:`, error.response?.data || error.message);
                    }
                })
            );

            console.log("Comment counts:", commentCounts);

            const maxComments = Math.max(...Object.values(commentCounts));
            const popularPosts = allPosts.filter((post) => commentCounts[post.id] === maxComments);

            cache.set("popular", popularPosts, 300);
            return res.json(popularPosts);
        }

        if (type === "latest") {
            const latestPosts = allPosts
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 5);

            cache.set("latest", latestPosts, 300);
            return res.json(latestPosts);
        }
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching posts" });
    }
};

module.exports = { getPosts };