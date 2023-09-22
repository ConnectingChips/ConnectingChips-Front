import MarkdownPreview from '@uiw/react-markdown-preview';

const style = {
  margin: '16px 16px 88px 16px',
  color: '#505050',
  'font-family': 'Noto Sans KR',
  'font-size': '14px',
  'white-space': 'normal',
};

export default function MarkDown({
  source,
  className,
}: {
  source: string | undefined;
  className: string;
}) {
  return (
    <MarkdownPreview
      className={className}
      source={source}
      wrapperElement={{
        'data-color-mode': 'light',
      }}
      style={style}
    />
  );
}
