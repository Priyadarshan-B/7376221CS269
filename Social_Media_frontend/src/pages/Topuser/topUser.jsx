import React, { useEffect, useState } from "react";
import UserList from "../../components/userCard/userList";
import { fetchTopUsers } from "../../components/utils/api";

const TopUser = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setTopUsers(await fetchTopUsers());
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Post Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <UserList users={topUsers} />
                </div>
            </div>
        </div>
    );
};

export default TopUser;