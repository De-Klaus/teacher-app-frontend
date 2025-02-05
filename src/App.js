import React, { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("Загрузка...");

    useEffect(() => {
        fetch("http://localhost:8080/api/message") // URL должен быть из Spring Boot
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error("Ошибка загрузки:", error));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{message}</h1>
        </div>
    );
}

export default App;
