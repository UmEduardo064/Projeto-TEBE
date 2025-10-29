import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Nav,
  Brand,
  NavActions,
  NavButton,
  Hero,
  Badge,
  HeroTitle,
  HeroSubtitle,
  Buttons,
  Button,
  VinylWrap,
  Features,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  Footer
} from "./styles";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* Topbar */}
      <Nav>
        <Brand onClick={() => navigate("/")}>APS‑DB‑PWB</Brand>
        <NavActions>
          <NavButton onClick={() => navigate("/login")}>Login</NavButton>
          <NavButton primary onClick={() => navigate("/cadastro")}>
            Cadastrar
          </NavButton>
        </NavActions>
      </Nav>

      {/* Hero */}
      <Hero>
        <Badge>Sistema de Discos</Badge>
        <HeroTitle>Seu catálogo definitivo de LPs, CDs e Box Sets</HeroTitle>
        <HeroSubtitle>
          Cadastre, pesquise e organize sua coleção com filtros avançados,
          anotações e foco em edições especiais. Simples, rápido e bonito.
        </HeroSubtitle>

        <Buttons>
          <Button primary onClick={() => navigate("/cadastro")}>
            Começar agora
          </Button>
          <Button onClick={() => navigate("/login")}>Já tenho conta</Button>
        </Buttons>

        {/* Decoração estilo vinil */}
        <VinylWrap aria-hidden="true" />
      </Hero>

      {/* Features */}
      <Features>
        <FeatureCard>
          <FeatureIcon>🎵</FeatureIcon>
          <FeatureTitle>Catálogo completo</FeatureTitle>
          <FeatureText>
            Cadastre discos com artista, ano, gravadora, país, edição e
            observações detalhadas.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🔍</FeatureIcon>
          <FeatureTitle>Busca avançada</FeatureTitle>
          <FeatureText>
            Filtros por artista, álbum, faixa, estado de conservação, país,
            favoritos e mais.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>⭐</FeatureIcon>
          <FeatureTitle>Favoritos & raridades</FeatureTitle>
          <FeatureText>
            Destaque edições japonesas (OBI), box sets e lançamentos limitados.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>📱</FeatureIcon>
          <FeatureTitle>Interface moderna</FeatureTitle>
          <FeatureText>
            Design responsivo e minimalista para desktop e mobile.
          </FeatureText>
        </FeatureCard>
      </Features>

      <Footer>APS‑DB‑PWB © 2025 • Projeto acadêmico</Footer>
    </Container>
  );
}