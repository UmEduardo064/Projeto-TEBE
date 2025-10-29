import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #363467 0%, rgba(30, 29, 79, 0.8) 100%);
  color: white;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

export const Botao = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background-color: white;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ddd;
    transform: scale(1.05);
  }
`;
