import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import StudentsListPage from "./pages/StudentsListPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import CreateStudentPage from "./pages/CreateStudentPage";
import EditStudentPage from "./pages/EditStudentPage";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
                <Link to="/users">Пользователи</Link>
                <Link to="/students">Студенты</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/users" element={<UsersPage />} />

                {/* Маршруты для студентов */}
                <Route path="/students" element={<StudentsListPage />} />
                <Route path="/students/create" element={<CreateStudentPage />} />
                <Route path="/students/:id" element={<StudentDetailPage />} />
                <Route path="/students/edit/:id" element={<EditStudentPage />} />
            </Routes>
        </Router>
    );
}

export default App;
