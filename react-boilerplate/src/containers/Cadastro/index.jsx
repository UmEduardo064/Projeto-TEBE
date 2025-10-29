import React, { useState } from "react";
import {
  MeuContainer,
  MeuFormulario,
  Input,
  BotaoCadastro,
  Title,
  ToastContainer,
  ToastMessage,
  Modal,
  ModalContent,
  ModalText,
  ModalButtons,
  ModalButton,
  RecoveryList,
  RecoveryItem,
  RecoveryUser,
  RecoveryEmail
} from "./styles";

import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { useNavigate } from "react-router-dom"; // << ADICIONADO

function Cadastro() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const navigate = useNavigate(); // << ADICIONADO

  // Recuperação
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryList, setRecoveryList] = useState([]);
  const [selectedRecover, setSelectedRecover] = useState(null);

  const showToast = (message, error = false) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, error }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  const validarEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const validarCampos = () => {
    if (!usuario.trim() || !email.trim() || !senha.trim()) {
      showToast("Preencha todos os campos!", true);
      return false;
    }
    if (usuario.trim().length < 3) {
      showToast("Usuário precisa ter ao menos 3 caracteres.", true);
      return false;
    }
    if (!validarEmail(email)) {
      showToast("E-mail inválido.", true);
      return false;
    }
    if (senha.length < 6) {
      showToast("Senha precisa ter ao menos 6 caracteres.", true);
      return false;
    }
    return true;
  };

  // Dispara ao clicar em Cadastrar
  const handleCadastro = async (e) => {
    e && e.preventDefault();
    if (loading) return;

    if (!validarCampos()) return;

    setLoading(true);
    try {
      // 1) Verifica se já existe no Firestore
      const q = query(collection(db, "usuarios"), where("Email", "==", email));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRecoveryList(lista);
        setShowRecovery(true);
        showToast("E-mail já cadastrado — verifique ou recupere sua conta.", true);
        setLoading(false);
        return;
      }

      // 2) Cria usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 3) Envia verificação de e-mail
      await sendEmailVerification(user);

      // 4) Salva no Firestore
      await addDoc(collection(db, "usuarios"), {
        Usuario: usuario,
        Email: email,
        uidUsuario: user.uid,
      });

      setUsuario("");
      setEmail("");
      setSenha("");
      showToast("✅ Cadastro realizado! Verifique seu e-mail para ativar a conta.");

      // << NOVO: redireciona para login depois de 3s
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      const code = err?.code || err?.message || "unknown";

      if (code === "auth/email-already-in-use") {
        showToast("Esse e-mail já está em uso. Verifique ou recupere a conta.", true);

        // busca no banco também, pra abrir o modal
        const q = query(collection(db, "usuarios"), where("Email", "==", email));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setRecoveryList(lista);
          setShowRecovery(true);
        }
      } else {
        showToast("❌ Erro ao cadastrar. Veja o console.", true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Clique em “Recuperar”
  const handleRecoverClick = (item) => {
    setSelectedRecover(item);
    showToast(`(placeholder) Enviar recuperação para ${item.Email}`);
    setShowRecovery(false);
  };

  return (
    <MeuContainer>
      <ToastContainer>
        {toasts.map((t) => (
          <ToastMessage key={t.id} error={t.error}>
            {t.message}
          </ToastMessage>
        ))}
      </ToastContainer>

      <MeuFormulario onSubmit={handleCadastro}>
        <Title>Cadastro de Usuário</Title>

        <Input
          placeholder="Digite seu usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <Input
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Digite sua senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <BotaoCadastro type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </BotaoCadastro>
      </MeuFormulario>

      {showRecovery && (
        <Modal>
          <ModalContent>
            <ModalText>
              Já existe(m) cadastro(s) com esse e-mail. Escolha o usuário para recuperar:
            </ModalText>

            <RecoveryList>
              {recoveryList.map((item) => (
                <RecoveryItem key={item.id}>
                  <div>
                    <RecoveryUser>{item.Usuario}</RecoveryUser>
                    <RecoveryEmail>{item.Email}</RecoveryEmail>
                  </div>
                  <ModalButton onClick={() => handleRecoverClick(item)}>Recuperar</ModalButton>
                </RecoveryItem>
              ))}
            </RecoveryList>

            <ModalButtons>
              <ModalButton cancel onClick={() => setShowRecovery(false)}>
                Fechar
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </MeuContainer>
  );
}

export default Cadastro;