import axios from "axios";
import { API_URL } from "../config";

export const fetchData = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("access_token"); // Получаем токен из localStorage (или другого хранилища)

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include", // Важно для работы с куками и JWT
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка запроса:", error);
        throw error;
    }
};
