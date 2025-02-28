import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

const EditStudentPage = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/students/${id}`)
            .then(response => response.json())
            .then(data => setStudent(data))
            .catch(error => console.error("Ошибка загрузки студента", error));
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/students/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student),
            });
            navigate(`/students/${id}`);
        } catch (error) {
            console.error("Ошибка обновления студента", error);
        }
    };

    return student ? (
        <form onSubmit={handleSubmit} className="p-8">
            <h1 className="text-2xl font-bold mb-6">Редактировать студента</h1>
            {Object.keys(student).map((key) => (
                <input key={key} name={key} value={student[key] || ''} onChange={handleChange} className="block mb-2" />
            ))}
            <button type="submit" className="p-2 bg-green-500 text-white">Сохранить</button>
        </form>
    ) : <p>Загрузка...</p>;
};

export default EditStudentPage;
