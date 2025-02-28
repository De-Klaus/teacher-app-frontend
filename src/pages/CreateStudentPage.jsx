import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        currentGrade: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${API_URL}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
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
                            type={key === "birthDate" || key === "schoolStartYear" || key === "currentGrade" ? "number" : "text"}
                            name={key}
                            value={student[key]}
                            onChange={handleChange}
                            placeholder={key}
                            required
                            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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