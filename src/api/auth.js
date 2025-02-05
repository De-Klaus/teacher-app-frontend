const API_URL = "https://teacherappthisdocker.onrender.com";

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include" // Передача куков
    });

    if (!response.ok) {
        throw new Error("Ошибка входа");
    }
    return response.json();
};

export const getProfile = async () => {
    const response = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Ошибка загрузки профиля");
    }
    return response.json();
};