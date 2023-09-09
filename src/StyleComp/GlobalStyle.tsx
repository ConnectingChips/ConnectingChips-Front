import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /* 색상코드 */
    --color-main: #FFBB00;
    --color-bg: #F7F7FB;
    --color-line: #F0F0F6;
    --font-color1: #111111;
    --font-color2: #505050;
    --font-color3: #767676;
    --system-red: #DC0000;
    --color-disabled1: #999999;
    --color-disabled2: #E5E5EC;
    --system-green: #04B014;

    /* 가로 폭 */
    --width-mobile: 375px;
    --width-my-mission: 11.25rem;

    /* 세로 폭 */
    --height-banner: 3.5rem;
    --height-gap: 0.5rem;

    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* ::-webkit-scrollbar {
    display: none;
  } */
  
  body {
    color: var(--font-color1);
    font-family: Noto Sans KR;
    font-style: normal;
    line-height: normal;    
    margin:0;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  li{
    list-style: none;

    &.button{
      &:hover{
          cursor: pointer;
          opacity: 60%;
      }
      &.active{
        background: #000;
        color: white;
      }
    }
  }

  
  h1 {
    font-size: 1.75rem;
    font-weight: 400;
  }

  h2{
    font-size: 1.125rem;
    font-weight: 500;

  }

  p{
    font-size: 0.75rem;
    font-weight: 400;
  }
  
  h1, h2, p, li, div{
    margin: 0;
    cursor: default;
    white-space: pre-line;
  }

  a{
    text-decoration: none;
    color: var(--font-color1);
    cursor: pointer;
  }

  button {
    background-color: transparent;
    border: 0;
    font-family: Noto Sans KR;

    &:hover {
        cursor: pointer;
    }
  }

  textarea{
    padding: 1rem;
    font-family: Noto Sans KR;
    font-size: 1rem;
  }
`;

export default GlobalStyle;
