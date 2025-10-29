import styled, { keyframes } from "styled-components";

/* ===== Layout geral ===== */
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #121212;
  padding: 16px;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px #00000070;
  width: 320px;
`;

export const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 10px;
  outline: none;
  background: #2a2a2a;
  color: #fff;
  font-size: 15px;

  &::placeholder {
    color: #9a9a9a;
  }
`;

export const Botao = styled.button`
  padding: 10px;
  background: #0077ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056cc;
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

/* ====== TOAST (equivalente ao do Cadastro) ====== */
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-15px) scale(0.95); }
  10% { opacity: 1; transform: translateY(0) scale(1); }
  80% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-15px) scale(0.95); }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none; /* não intercepta cliques fora da mensagem */
`;

export const ToastMessage = styled.div`
  background: ${({ $error }) => ($error ? "#ff3b30" : "#34c759")};
  color: #fff;
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  min-width: 160px;
  max-width: 280px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.45), 0 0 6px rgba(255,255,255,0.05);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: ${fadeInOut} 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  pointer-events: auto; /* se quiser clicar no toast no futuro */
`;
