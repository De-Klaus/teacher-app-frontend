import { login } from "../api/auth";
import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const user = await login(username, password);
            console.log("Успешный вход:", user);
        } catch (error) {
            console.error("Ошибка авторизации:", error.message);
        }
    };

    return (
        <div>
            <h1>Вход</h1>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Имя пользователя" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Пароль" 
            />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default LoginPage;