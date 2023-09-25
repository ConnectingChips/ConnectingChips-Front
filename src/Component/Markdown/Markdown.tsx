import styled from 'styled-components';
import MarkdownPreview from '@uiw/react-markdown-preview';

const style = {
  margin: '16px 16px 88px 16px',
  color: '#505050',
};

export default function MarkDown({
  source,
  className,
}: {
  source: string | undefined;
  className: string;
}) {
  return (
    <ModalContentS>
      <MarkdownPreview
        className={className}
        source={source}
        wrapperElement={{
          'data-color-mode': 'light',
        }}
        style={style}
      />
    </ModalContentS>
  );
}

const ModalContentS = styled.div`
  max-height: calc(100dvh - 88px);
  overflow-y: auto;
  div,
  p,
  ol,
  ul,
  li,
  strong {
    font-family: 'Noto Sans KR';
    font-size: 14px;
  }

  div,
  li {
    white-space: normal;
  }

  &.modal_contents {
    height: 100%;
  }

  p {
    font-size: 14px;
    margin-bottom: 0;
  }

  li p {
    margin-bottom: 0;
  }

  ul,
  ol {
    margin: 0;
    padding-left: 16px;
  }

  ul {
    padding: 0;
    list-style-type: circle;
  }

  ol {
    list-style-type: decimal;
  }

  ol > li {
    list-style: number;
  }

  ol li p {
    margin: 0;
  }
`;
