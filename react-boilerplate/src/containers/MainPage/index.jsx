import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Container, Title, SubTitle, Botao } from "./styles";

export default function MainPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <Container>
      <Title>🎉 Bem-vindo à Main Page!</Title>
      <SubTitle>Você está logado e seu e-mail foi verificado.</SubTitle>
      <Botao onClick={handleLogout}>Sair</Botao>
    </Container>
  );
}