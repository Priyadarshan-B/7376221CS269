import React from "react";

const UserCard = ({ user }) => {
    return (
        <div className="flex items-center space-x-3 bg-white shadow-md p-4 rounded-lg mb-2">
            <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
            />
            <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-500 text-sm">Posts: {user.postCount}</p>
            </div>
        </div>
    );
};

export default UserCard;
