import React from "react";

const PostCard = ({ post }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
            <div className="text-sm text-gray-500 mt-2">
            </div>
        </div>
    );
};

export default PostCard;
