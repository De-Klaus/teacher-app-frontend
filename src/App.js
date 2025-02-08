import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/login">Вход</Link>
                <Link to="/register">Регистрация</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
