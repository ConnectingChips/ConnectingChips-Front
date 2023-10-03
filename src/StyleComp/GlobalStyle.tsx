import { createGlobalStyle } from 'styled-components';

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
    --color-white: #ffffff;

    /* 가로 폭 */
    --width-mobile: 375px;
    --width-my-mission: 11.25rem;

    /* 세로 폭 */
    --height-header: 3.5rem;
    --height-gap: 0.5rem;

    /* 폰트 크기 */
    --welcome: 1.75rem;
    --header: 1.25rem;
    --head-a: 1.5rem;
    --head-b: 1.125rem;
    --head-c: 1rem;
    --body-a: 1rem;
    --body-b: 0.875rem;
    --body-c: 0.75rem;
    --button-big: 1rem;
    --button-mid: 0.875rem;
    --button-mid-bold: 0.875rem;  // 볼드 속성 
    --button-small: 0.6875rem;
    
    /* 가로 폭 */
    /* --width-mobile: 23.4375rem; */
    --width-mobile: 22.5rem;

    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  *{
    margin: 0;
    cursor: default;
  }

  h1, h2, p, li, div{
    white-space: pre-line;
  }
  
  body {
    color: var(--font-color1);
    font-family: 'Noto Sans KR', sans-serif;
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

  a{
    text-decoration: none;
    color: var(--font-color1);
  }

  button {
    background-color: transparent;
    border: 0;
    font-family: 'Noto Sans KR', sans-serif;
    cursor: default;
  }

  textarea{
    padding: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1rem;
  }
`;

export default GlobalStyle;
