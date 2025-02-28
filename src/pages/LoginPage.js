import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);
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

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("Ошибка обработки ответа сервера");
            }

            if (!data.token) {
                throw new Error("Токен отсутствует в ответе сервера");
            }

            localStorage.setItem("token", data.token);
            console.log("Успешный вход:", data);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Логин" 
                    required 
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Пароль" 
                    required 
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    onClick={handleLogin} 
                    disabled={isLoading}
                    className={`w-full p-3 rounded-lg transition duration-200 ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    {isLoading ? "Вход..." : "Войти"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
