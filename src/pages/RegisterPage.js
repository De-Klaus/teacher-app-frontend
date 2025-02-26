import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Поле подтверждения пароля
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (!username.trim()) {
            setError("Имя пользователя обязательно");
            return;
        }

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error("Ошибка регистрации. Возможно, пользователь уже существует.");
            }

            // ✅ После успешной регистрации перенаправляем на главную страницу
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default RegisterPage;