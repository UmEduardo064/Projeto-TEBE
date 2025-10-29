import styled, { keyframes } from "styled-components";

/* ===== Base ===== */

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(1200px 600px at 10% -10%, #111318 0%, #0f0f10 35%, #0b0b0c 100%);
  color: #f5f5f7;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
`;

/* ===== Nav ===== */

export const Nav = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(15,15,16,0.7), rgba(15,15,16,0));
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
`;

export const Brand = styled.div`
  font-weight: 800;
  letter-spacing: 0.3px;
  font-size: 1.05rem;
  color: #e6e6e7;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #ffffff;
  }
`;

export const NavActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const NavButton = styled.button`
  padding: 10px 14px;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid ${({ primary }) => (primary ? "transparent" : "rgba(255,255,255,0.08)")};
  background: ${({ primary }) => (primary ? "#0a84ff" : "rgba(255,255,255,0.03)")};
  color: #fff;
  cursor: pointer;
  transition: all .2s ease;

  &:hover {
    background: ${({ primary }) => (primary ? "#0077ff" : "rgba(255,255,255,0.06)")};
    transform: translateY(-1px);
  }
`;

/* ===== Hero ===== */

const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(0.2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

export const Hero = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 80px 20px 60px;
  overflow: hidden;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 8px 12px;
  font-size: 12px;
  letter-spacing: .4px;
  color: #cfd3da;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  background: rgba(255,255,255,0.03);
  margin-bottom: 14px;
`;

export const HeroTitle = styled.h1`
  max-width: 900px;
  font-size: clamp(28px, 6vw, 52px);
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: .2px;
  margin: 0 0 14px;
  color: #f5f7fb;
`;

export const HeroSubtitle = styled.p`
  max-width: 720px;
  font-size: clamp(15px, 2.5vw, 18px);
  color: #c9ccd2;
  margin: 0 0 26px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 14px 22px;
  border-radius: 14px;
  font-weight: 700;
  border: 1px solid ${({ primary }) => (primary ? "transparent" : "rgba(255,255,255,0.08)")};
  background: ${({ primary }) => (primary ? "#0a84ff" : "rgba(255,255,255,0.04)")};
  color: #ffffff;
  cursor: pointer;
  transition: all .18s ease;
  letter-spacing: 0.2px;

  &:hover {
    background: ${({ primary }) => (primary ? "#0077ff" : "rgba(255,255,255,0.08)")};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* Disco estilizado ao fundo (sutil, sem imagem externa) */
export const VinylWrap = styled.div`
  position: absolute;
  inset: auto;
  width: min(820px, 90vw);
  height: min(820px, 90vw);
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  margin-top: 80px;
  animation: ${float} 6s ease-in-out infinite;

  /* Conjuntos de gradientes criando anéis do vinil */
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0 2px, transparent 3px) 50% 50%/ 100% 100% no-repeat,
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0 1px, transparent 2px) 50% 50%/ 100% 100% no-repeat,
    radial-gradient(circle, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.03) 12%, rgba(0,0,0,0) 12.5%),
    radial-gradient(circle, rgba(255,255,255,0.04) 0, rgba(0,0,0,0) 16%),
    radial-gradient(circle, rgba(255,255,255,0.03) 0, rgba(0,0,0,0) 20%),
    radial-gradient(circle, rgba(255,255,255,0.025) 0, rgba(0,0,0,0) 24%),
    radial-gradient(circle at 50% 50%, #0e0f12, #0a0b0d 60%, #060607 100%);
  filter: saturate(110%) blur(0.2px) drop-shadow(0 60px 120px rgba(0,0,0,0.6));
  opacity: 0.55;
`;

/* ===== Features ===== */

export const Features = styled.section`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(4, 1fr);
  padding: 28px 20px 40px;
  width: min(1100px, 92vw);
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
  transition: transform .18s ease, background .18s ease, border-color .18s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 26px;
  margin-bottom: 8px;
`;

export const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 6px;
  color: #f0f2f5;
`;

export const FeatureText = styled.p`
  margin: 0;
  color: #c8cbd2;
  font-size: 14px;
  line-height: 1.5;
`;

/* ===== Footer ===== */

export const Footer = styled.footer`
  text-align: center;
  padding: 24px 16px 36px;
  color: #a6aab4;
  font-size: 13px;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: 16px;
`;