import { useEffect, useState } from "react";
import { API_URL } from "../config";

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Ошибка загрузки пользователей");
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Главная страница</h1>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {!loading && !error && (
                <div>
                    <h2>Список пользователей:</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomePage;
