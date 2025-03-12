import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
            <Card className="w-96 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Вход</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    
                    <Input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Логин" 
                        required 
                        className="mb-4"
                    />

                    <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Пароль" 
                            required 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <Button 
                        onClick={handleLogin} 
                        disabled={isLoading}
                        className="w-full mt-4"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <Loader2 className="animate-spin mr-2" size={18} /> Вход...
                            </span>
                        ) : (
                            "Войти"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
