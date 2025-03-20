import React from "react";
import PostCard from "./postCard";

const PostList = ({ posts, title }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <p className="text-gray-500">No posts available.</p>
            )}
        </div>
    );
};

export default PostList;
