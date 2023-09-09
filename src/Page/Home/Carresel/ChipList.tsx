import { styled } from "styled-components";
import { chip_Active, chip_NoneActive } from "./CarreselBarrel";


/** 2023-08-20 ChipList.tsx - 현재 카운트 (칩스) */
const ChipList = ({ count }: { count: number }): JSX.Element => {
  const isChecked: string[] = ["", "", ""];
  for (let idx = 0; idx < count; idx++) {
    isChecked[idx] = "checked";
  }

  return (
    <ChipListS>
      {isChecked.map((className, idx) => {
        const chipState = className === "checked" ? chip_Active : chip_NoneActive;
        return (
          <ChipCicleS state={className} key={idx}>
            <img src={chipState} alt="chip State" key={idx} />
          </ChipCicleS>
        );
      })}
    </ChipListS>
  );
};

export default ChipList;

/** 2023-08-21 ChipList.tsx - 시식 칩 리스트*/
const ChipListS = styled.ul`
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 13.5px;
  gap: 0.85rem;
`;

/** 2023-08-23 ChipList.tsx - 시식 칩 항목*/
const ChipCicleS = styled.li<{ state: string }>`
  width: 2.52456rem;
  aspect-ratio: 1/1;
  background-color: ${(props) => (props.state === "checked" ? "#FFD32C" : "#D9D9D9")};
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 2rem;
  }
`;
