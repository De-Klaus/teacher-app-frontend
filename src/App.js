import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <div style={{ textAlign: "center", marginTop: "50px" }}>
                            <h1>Главная страница</h1>
                            <div style={{ marginTop: "20px" }}>
                                <Link to="/login">
                                    <button style={{ marginRight: "10px", padding: "10px 20px" }}>
                                        Войти
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button style={{ padding: "10px 20px" }}>
                                        Зарегистрироваться
                                    </button>
                                </Link>
                            </div>
                        </div>
                    } 
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
