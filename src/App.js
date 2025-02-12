import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
                <Link to="/users">Пользователи</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
        </Router>
    );
}

export default App;
