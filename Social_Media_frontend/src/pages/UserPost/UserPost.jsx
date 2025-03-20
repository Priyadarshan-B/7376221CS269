import React, { useEffect, useState } from "react";
import PostList from "../../components/postCard/postList";
import { fetchPosts } from "../../components/utils/api";

const UserPost = () => {
    const [popularPosts, setPopularPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setPopularPosts(await fetchPosts("popular"));
            setLatestPosts(await fetchPosts("latest"));
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Post Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                <div className="md:col-span-2 space-y-6">
                    <PostList title="Popular Posts" posts={popularPosts} />
                    <PostList title="Latest Posts" posts={latestPosts} />
                </div>
            </div>
        </div>
    );
};

export default UserPost;
