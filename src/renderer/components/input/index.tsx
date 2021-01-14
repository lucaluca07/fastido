import React, { createRef } from 'react';
import cx from 'classnames';
import Quill from 'quill';
import './index.global.scss';

interface Props {
  task?: string;
  placeholder?: string;
  className?: string;
  initText?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}

class Input extends React.Component<Props> {
  editorRef: React.RefObject<HTMLDivElement>;

  quill?: Quill;

  constructor(props: Props) {
    super(props);
    this.editorRef = createRef();
  }

  componentDidMount() {
    this.initQuill();
  }

  focus = () => {
    this.quill?.focus();
  };

  blur = () => {
    this.quill?.blur();
  };

  initQuill = () => {
    const { initText, autoFocus } = this.props;
    if (!this.editorRef.current) return;
    const bindings = {
      enter: {
        key: 13,
        handler: () => {
          const { onEnter } = this.props;
          onEnter?.();
          const text = this.quill?.getText();
          if (!text) return;
          this.quill?.deleteText(0, text.length);
        },
      },
    };
    const { placeholder } = this.props;
    const quill = new Quill(this.editorRef.current, {
      placeholder,
      modules: {
        toolbar: false, // Snow includes toolbar by default
        keyboard: { bindings },
      },
      theme: 'snow',
    });

    if (autoFocus) {
      quill.focus();
    }

    if (initText) {
      quill.insertText(0, initText);
      // 删除换行符
      quill.deleteText(initText.length, 1);
    }

    this.quill = quill;
  };

  getText = () => {
    const length = this.quill?.getLength();
    const text = this.quill?.getText(0, length);
    console.log(text);
    return text?.replace(/^\\n$/g, '');
  };

  render() {
    const { className } = this.props;
    return (
      <div className={cx('input', className)}>
        <div className="task-input" ref={this.editorRef} />
      </div>
    );
  }
}

export default Input;
