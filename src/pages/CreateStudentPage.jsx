import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const CreateStudentPage = () => {
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        city: "",
        birthDate: "",
        timeZone: "",
        platform: "",
        schoolStartYear: "",
        currentGrade: "",
        createdAt: new Date().toISOString().split("T")[0] // Устанавливаем текущую дату
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");

        try {
            const requestData = {
                ...student,
                birthDate: student.birthDate ? new Date(student.birthDate).toISOString().split("T")[0] : null,
                createdAt: student.createdAt // Уже установлена при инициализации
            };

            const response = await fetch(`${API_URL}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании студента");
            }

            navigate("/students");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Создать студента</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {Object.keys(student).map((key) => (
                        <input
                            key={key}
                            type={key === "birthDate" || key === "createdAt" ? "date" : key === "schoolStartYear" || key === "currentGrade" ? "number" : "text"}
                            name={key}
                            value={student[key]}
                            onChange={handleChange}
                            placeholder={key}
                            required
                            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={key === "createdAt"} // Блокируем редактирование createdAt
                        />
                    ))}
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Создать
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStudentPage;