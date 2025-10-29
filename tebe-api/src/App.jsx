import { useEffect, useState } from "react";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles/GlobalStyle";
import Card from "./components/Card";
import { Skeleton } from "./components/Skeleton";

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(24px, 4vw, 48px);
  gap: 20px;
`;

const Header = styled.header`
  width: 880px;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 800;
  font-size: clamp(22px, 3.4vw, 32px);
  letter-spacing: -0.03em;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 12px 14px;
  border-radius: var(--radius-md);
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  min-width: 260px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, background .25s ease;

  &:focus {
    box-shadow: ${({ theme }) => theme.focus};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const Button = styled.button`
  position: relative;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease, background .25s ease;
  box-shadow: ${({ theme }) => theme.shadowSoft};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.focus}, ${({ theme }) => theme.shadowSoft};
  }
`;

const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textMuted};
  font-size: 14px;
`;

function App() {
  const API_KEY = "8mX7gZlFBm0bJ7jjhjg8atBpr5eGql72xYvIMpT4";
  const [theme, setTheme] = useState("light");
  const [spots, setSpots] = useState([]);
  const [selectedSpotId, setSelectedSpotId] = useState("");
  const [spotData, setSpotData] = useState(null);
  const [loadingSpots, setLoadingSpots] = useState(false);
  const [loadingSpotData, setLoadingSpotData] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const getSpots = async () => {
      try {
        setLoadingSpots(true);
        const res = await axios.get("https://api.iotebe.com/v2/spot", {
          headers: { "x-api-key": API_KEY },
        });
        setSpots(res.data);
      } catch (err) {
        console.error("Erro ao carregar spots:", err);
      } finally {
        setLoadingSpots(false);
      }
    };
    getSpots();
  }, []);

  useEffect(() => {
    const getSpotData = async () => {
      if (!selectedSpotId) return;
      try {
        setLoadingSpotData(true);
        const res = await axios.get(
          `https://api.iotebe.com/v2/spot/${selectedSpotId}/ng1vt/global_data/data`,
          { headers: { "x-api-key": API_KEY } }
        );
        setSpotData(res.data[0]);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoadingSpotData(false);
      }
    };
    getSpotData();
  }, [selectedSpotId]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Page>
        <Header>
          <div>
            <Title>Monitor de Pontos de Coleta</Title>
            <Hint>Selecione um ponto para visualizar os dados.</Hint>
          </div>
          <Controls>
            <Button onClick={toggleTheme}>
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </Button>
          </Controls>
        </Header>

        {loadingSpots ? (
          <div style={{ width: "880px", maxWidth: "100%" }}>
            <Skeleton w="260px" h="44px" />
          </div>
        ) : (
          <Select
            onChange={(e) => setSelectedSpotId(e.target.value)}
            defaultValue=""
            aria-label="Selecione um ponto"
          >
            <option value="" disabled>
              Selecione um ponto
            </option>
            {spots.map((spot) => (
              <option key={spot.spot_id} value={spot.spot_id}>
                {spot.spot_name}
              </option>
            ))}
          </Select>
        )}

        {loadingSpotData && (
          <div style={{ width: "880px", maxWidth: "100%" }}>
            <Skeleton w="100%" h="160px" style={{ borderRadius: 18 }} />
          </div>
        )}

        {spotData && !loadingSpotData && <Card spotData={spotData} />}
      </Page>
    </ThemeProvider>
  );
}

export default App;