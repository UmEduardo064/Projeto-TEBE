import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { 
  Container,
  Formulario,
  Input,
  Botao,
  Title,
  ToastContainer,
  ToastMessage
} from "./styles.js";

import { applyActionCode, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [toasts, setToasts] = useState([]);
  const [verificado, setVerificado] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showToast = (msg, error = false) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, error }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  };

  // Checa URL para verificação de e-mail
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const oobCode = params.get("oobCode");

    if (mode === "verifyEmail" && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          showToast(" E-mail verificado com sucesso!");
          setVerificado(true);
        })
        .catch(err => {
          console.error("Erro ao verificar e-mail:", err);
          showToast(" Erro ao verificar e-mail.", true);
        });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // 1) Tenta autenticar
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2) Checa se o e-mail foi verificado
      if (!user.emailVerified) {
        showToast("E-mail não verificado. Verifique seu e-mail antes de logar.", true);
        return;
      }

      // 3) Login OK
      showToast(" Login realizado com sucesso!");
      navigate("/main");
    } catch (err) {
      console.error(err);
      showToast(" E-mail ou senha inválidos!", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Toasts equivalentes ao Cadastro (fixos, centralizados no topo) */}
      <ToastContainer role="status" aria-live="polite">
        {toasts.map(t => (
          <ToastMessage key={t.id} $error={t.error}>
            {t.msg}
          </ToastMessage>
        ))}
      </ToastContainer>

      <Formulario onSubmit={handleLogin}>
        <Title>{verificado ? "E-mail verificado! Faça login" : "Login"}</Title>

        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          autoComplete="current-password"
        />

        <Botao type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </Botao>
      </Formulario>
    </Container>
  );
}

export default Login;