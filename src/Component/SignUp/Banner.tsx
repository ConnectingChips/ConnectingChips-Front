import { styled } from "styled-components";
import Logo_001 from "../../image/Home/Logo_001.png";

/** 2023-08-24 Banner.tsx - 로그인 / 회원가입 배너 */
const Banner = (): JSX.Element => {
  return <BannerS src={Logo_001} alt="logo" />;
};

export default Banner;

/** 2023-08-24 Banner.tsx - 로그인 / 회원가입 배너 */
const BannerS = styled.img`
  width: 8.125rem;
  margin: 2rem 0;
  align-self: center;
`;
