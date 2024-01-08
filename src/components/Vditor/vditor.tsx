import { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import './index.less';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const { value, onChange } = props;
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vditor = new Vditor(editorRef.current!, {
      value,
      input: (value) => onChange(value),
      cache: { enable: false, id: 'vditor' },
      minHeight: 200,
      height: props.height || '100%',
      counter: { enable: true },
      placeholder: '请输入...',
      preview: {
        theme: {
          current: 'light',
        },
      },
      outline: {
        enable: true,
        position: 'left',
      },
    });
    console.log(vditor);
    console.log('%c [ value ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', value);
  }, []);

  return <div className="markdown-editor-v" ref={editorRef}></div>;
}
