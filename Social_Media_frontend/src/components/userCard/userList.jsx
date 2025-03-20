import React from "react";
import UserCard from "./userCard";

const UserList = ({ users }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Top Users</h2>
            {users.length > 0 ? (
                users.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
                <p className="text-gray-500">No top users available.</p>
            )}
        </div>
    );
};

export default UserList;
