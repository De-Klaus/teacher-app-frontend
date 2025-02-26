import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Ошибка авторизации. Проверьте имя пользователя и пароль.");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token); // Сохранение JWT-токена

            console.log("Успешный вход:", data);
            navigate("/dashboard"); // Перенаправление после входа
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Вход</h1>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Логин" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Пароль" 
                required 
            />
            <button onClick={handleLogin}>Войти</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
