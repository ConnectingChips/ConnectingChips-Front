import { styled } from "styled-components";

/** 2023-08-29 Carresel.tsx - 캐러셀 이미지 컴포넌트 */
const ImageBoxS = styled.ul<{ count: number; sort: string; length: number }>`
  display: flex;

  transition: ${(props) => (props.sort === "next" ? (!props.count ? "" : "all 0.5s ease-in-out") : props.sort === "prev" ? (props.count === props.length ? "" : "all 0.5s ease-in-out") : "")};
  transform: ${(props) => "translateX(-" + props.count * 190 + "px)"};
  gap: 0.75rem;
  width: 100vw;
`;

export default ImageBoxS;