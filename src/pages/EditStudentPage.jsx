import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

const EditStudentPage = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/students/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Добавляем токен
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ошибка загрузки студента");
                }
                return response.json();
            })
            .then(data => setStudent(data))
            .catch(error => setError(error.message));
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/students/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Добавляем токен
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) {
                throw new Error("Ошибка обновления студента");
            }

            navigate(`/students/${id}`);
        } catch (error) {
            setError(error.message);
        }
    };

    return student ? (
        <form onSubmit={handleSubmit} className="p-8">
            <h1 className="text-2xl font-bold mb-6">Редактировать студента</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {Object.keys(student).map((key) => (
                <input
                    key={key}
                    name={key}
                    value={student[key] || ""}
                    onChange={handleChange}
                    className="block mb-2 border p-2 rounded"
                />
            ))}
            <button type="submit" className="p-2 bg-green-500 text-white rounded">Сохранить</button>
        </form>
    ) : <p className="p-8">Загрузка...</p>;
};

export default EditStudentPage;
