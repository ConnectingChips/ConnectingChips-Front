import { ArrowLeft, Arrow_Right, styled } from "./CarreselBarrel";

type SlideProps = { count: number; setSort: React.Dispatch<React.SetStateAction<string>>; setCount: React.Dispatch<React.SetStateAction<number>>; TOTAL_SLIDES: number };

/** 2023-09-02 CarreselSlideButton.tsx - 캐러셀 좌우 버튼 컴포넌트 - Kadesti */
const CarreselSlideButton = ({ count, setSort, setCount, TOTAL_SLIDES }: SlideProps) => {
  /** 2023-08-29 Carresel.tsx - 다음 이동 핸들러 */
  const nextSlide = () => {
    setSort("next");

    if (count >= TOTAL_SLIDES) setCount(0);
    else setCount((prev) => prev + 1);
  };

  /** 2023-08-29 Carresel.tsx - 이전 이동 핸들러 */
  const prevSlide = () => {
    setSort("prev");

    if (count === 0) setCount(TOTAL_SLIDES);
    else setCount((prev) => prev - 1);
  };

  return (
    <>
      <ButtonS onClick={prevSlide} isvalid={`${count !== 0}`} side="left">
        <img src={ArrowLeft} alt="ArrowLeft" />
      </ButtonS>
      <ButtonS onClick={nextSlide} isvalid={`${count !== TOTAL_SLIDES}`} side="right">
        <img src={Arrow_Right} alt="ArrowRight" />
      </ButtonS>
    </>
  );
};

export default CarreselSlideButton;

/** 2023-08-29 Carresel.tsx - 캐러셀 좌우 버튼 */
const ButtonS = styled.button<{ isvalid: string; side: string }>`
  visibility: ${(props) => (props.isvalid === "true" ? "" : "hidden")};
  position: absolute;
  margin-top: 4.5rem;
  margin-left: ${(props) => (props.side === "left" ? "1rem" : "19rem")};

  background-color: rgba(79, 79, 79, 0.7);
  border-radius: 10rem;
  /* padding: 0.5rem; */
  padding-left: 0.3rem;
  padding-top: 0.3rem;
  width: 2rem;
  aspect-ratio: 1/1;

  &:hover {
    opacity: 70%;
  }
`;
