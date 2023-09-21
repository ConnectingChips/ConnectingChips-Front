import MarkdownPreview from '@uiw/react-markdown-preview';
import { RehypeRewriteOptions } from 'rehype-rewrite';

const source = `
**서비스 이용약관**
<!--rehype:style=font-family: Noto Sans KR; font-size: 14px; font-weight: 700; color: #111; border: none; margin: 0;--> 
제1조(목적)
이 약관은 커넥팅칩스 (이하 ‘팀’이라고 합니다)가 제공하는 제반 서비스의 이용과 관련하여 팀과 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
<!--rehype:style=padding: 0; font-family: Noto Sans KR; font-size: 14px; color: #505050; margin: 0;--> 

이 약관은 어쩌구

이 약관언 쩌거꾸
`;

export default function Demo() {
  return (
    <MarkdownPreview
      source={source}
      wrapperElement={{
        'data-color-mode': 'light',
      }}
    />
  );
}
