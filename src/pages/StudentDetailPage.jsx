import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

const StudentDetailPage = () => {
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

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить этого студента?")) {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${API_URL}/students/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен
                    },
                });

                if (!response.ok) {
                    throw new Error("Ошибка удаления студента");
                }

                navigate("/students");
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="p-8">
            {error && <p className="text-red-500">{error}</p>}
            {student ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        {student.firstName} {student.lastName}
                    </h1>
                    <p>Город: {student.city}</p>
                    <p>Дата рождения: {student.birthDate}</p>
                    <button
                        onClick={() => navigate(`/students/edit/${id}`)}
                        className="mr-4 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                        Редактировать
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Удалить
                    </button>
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default StudentDetailPage;