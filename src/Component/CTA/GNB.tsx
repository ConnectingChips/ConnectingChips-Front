import { styled } from "styled-components";
import { FeedIcon, HomeIcon, MyPageIcon } from "./GNBIcon";

/** 2023-08-1 GNB img 속성 */
type GNBType = {
  url: string;
  alt: string;
};
/** 2023-08-20 Global Navigator Bar */
const GNB = () => {
  const gnbIcon: GNBType[] = [
    {
      url: HomeIcon,
      alt: "HomeIcon",
    },
    {
      url: FeedIcon,
      alt: "FeedIcon",
    },
    {
      url: MyPageIcon,
      alt: "MyPageIcon",
    },
  ];
  return (
    <GNBS>
      {gnbIcon.map((icon, idx) => {
        return (
          <li key={idx}>
            <img src={icon.url} alt={icon.url} />
          </li>
        );
      })}
    </GNBS>
  );
};

export default GNB;

/** 2023-08-20 Global Navigator Bar Style*/
const GNBS = styled.ul`
  height: 3.25rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
`;
