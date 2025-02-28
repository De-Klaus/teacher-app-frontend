import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

const StudentDetailPage = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/students/${id}`)
            .then(response => response.json())
            .then(data => setStudent(data))
            .catch(error => console.error("Ошибка загрузки студента", error));
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить этого студента?")) {
            try {
                await fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
                navigate("/students");
            } catch (error) {
                console.error("Ошибка удаления студента", error);
            }
        }
    };

    return (
        <div className="p-8">
            {student ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">{student.firstName} {student.lastName}</h1>
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