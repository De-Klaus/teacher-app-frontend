import { login } from "../api/auth";
import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const user = await login(email, password);
            console.log("Успешный вход:", user);
        } catch (error) {
            console.error("Ошибка авторизации:", error.message);
        }
    };

    return (
        <div>
            <h1>Вход</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default LoginPage;