import { styled } from "styled-components";
import errorChips from "../../image/chips_404.svg";
import { BackButton, ErrorCTA } from "../../Component/CTA/CTAContainer";

/** 2023-08-28 NotFound.tsx - 404 에러 페이지 */
const NotFound = () => {
  return (
    <NotFoundS>
      <NotFoundContentS>
        <img src={errorChips} alt="errorChips" />
        <div className="textbox">
          <h1>잘못된 접근입니다</h1>
          <p>찾으시는 페이지가 존재하지 않습니다</p>
        </div>
        <BackButton />
      </NotFoundContentS>

      <div className="CTA">
        <ErrorCTA />
      </div>
    </NotFoundS>
  );
};

export default NotFound;

/** 2023-08-28 NotFound.tsx - 404 에러 페이지 */
const NotFoundS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: var(--width-mobile);
  max-width: var(--width-mobile);
  height: 100vh;

  position: relative;

  .CTA {
    position: absolute;
    bottom: 1rem;
  }
`;

/** 2023-08-28 NotFound.tsx - 404 에러 컨텐츠 */
const NotFoundContentS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 14.875rem;

  .textbox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    color: var(--font-color3);
    font-size: 0.875rem;
  }
`;
