import React, { useEffect, useState } from "react";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://teacherappthisdocker.onrender.com/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include" // Можно убрать, если не нужны cookies
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Ошибка загрузки пользователей:", error));
    }, []);

    return (
        <div>
            <h1>Список пользователей</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
