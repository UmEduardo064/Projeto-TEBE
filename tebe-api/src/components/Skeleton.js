import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const Skeleton = styled.div`
  width: ${({ w }) => w || "100%"};
  height: ${({ h }) => h || "16px"};
  border-radius: 8px;
  background: ${({ theme }) => theme.skeletonBase};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.skeletonBase} 0px,
    ${({ theme }) => theme.skeletonHighlight} 40px,
    ${({ theme }) => theme.skeletonBase} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s infinite linear;
  opacity: 0.9;
`;