import { useEffect, useState } from "react";

function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/users")
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
}

export default UsersPage;