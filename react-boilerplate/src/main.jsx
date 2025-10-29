import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // <-- App.jsx agora tem todas as rotas e estilos

createRoot(document.getElementById("root")).render(<App />);
