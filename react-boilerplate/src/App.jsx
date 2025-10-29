import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./containers/Landing";
import Cadastro from "./containers/Cadastro";
import Login from "./containers/Login";
import MainPage from "./containers/MainPage"; 
import MyGlobalStyles from "./styles/globalStyles";

export default function App() {
  return (
    <>
      <MyGlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}
