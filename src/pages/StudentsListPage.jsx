import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

const StudentsListPage = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_URL}/students`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Добавляем токен
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => setStudents(data))
        .catch(error => console.error("Ошибка загрузки студентов", error));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Список студентов</h1>
            <ul>
                {students.map(student => (
                    <li key={student.id} className="mb-4">
                        <span>{student.firstName} {student.lastName}</span>
                        <button 
                            onClick={() => navigate(`/students/${student.id}`)} 
                            className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Подробнее
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentsListPage;
