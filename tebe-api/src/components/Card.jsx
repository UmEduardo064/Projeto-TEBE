import styled from "styled-components";

const CardContainer = styled.section`
  position: relative;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: var(--radius-lg);
  padding: 24px;
  width: 880px;
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadowSoft};
  transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
  backdrop-filter: saturate(180%) blur(14px);
  background-image: ${({ theme }) => theme.cardGloss};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.02em;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.textMuted};
  font-size: 14px;
`;

const Divider = styled.hr`
  height: 1px;
  border: none;
  background: ${({ theme }) => theme.border};
  margin: 12px 0 18px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled.article`
  position: relative;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  border-radius: var(--radius-md);
  padding: 16px;
  transition: background .25s ease, border-color .25s ease, transform .25s ease;

  &:focus-within {
    outline: none;
    box-shadow: ${({ theme }) => theme.focus};
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

const Label = styled.div`
  color: ${({ theme }) => theme.textMuted};
  font-size: 12px;
  letter-spacing: .02em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Value = styled.div`
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
`;

function Card({ spotData }) {
  const formatDate = (timestamp) => {
    if (!timestamp || timestamp === 0) return "Sem dados recentes";
    const time =
      timestamp.toString().length === 10
        ? Number(timestamp) * 1000
        : Number(timestamp);
    const date = new Date(time);
    if (isNaN(date.getTime())) return "Data inválida";
    return date.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  };

  const formatNum = (n, u) =>
    typeof n === "number" ? `${n.toFixed(2)}${u || ""}` : "—";

  return (
    <CardContainer>
      <Header>
        <Title>Dados do Ponto</Title>
        <Meta>{formatDate(spotData.timestamp)}</Meta>
      </Header>
      <Divider />

      <Grid>
        <Metric>
          <Label>Temperatura</Label>
          <Value>{formatNum(spotData.temperature, "°C")}</Value>
        </Metric>

        <Metric>
          <Label>Aceleração Axial</Label>
          <Value>{formatNum(spotData.acceleration_axial)}</Value>
        </Metric>

        <Metric>
          <Label>Aceleração Horizontal</Label>
          <Value>{formatNum(spotData.acceleration_horizontal)}</Value>
        </Metric>

        <Metric>
          <Label>Aceleração Vertical</Label>
          <Value>{formatNum(spotData.acceleration_vertical)}</Value>
        </Metric>

        <Metric>
          <Label>Velocidade Axial</Label>
          <Value>{formatNum(spotData.velocity_axial)}</Value>
        </Metric>

        <Metric>
          <Label>Velocidade Horizontal</Label>
          <Value>{formatNum(spotData.velocity_horizontal)}</Value>
        </Metric>

        <Metric>
          <Label>Velocidade Vertical</Label>
          <Value>{formatNum(spotData.velocity_vertical)}</Value>
        </Metric>
      </Grid>
    </CardContainer>
  );
}

export default Card;
``