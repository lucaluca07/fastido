import React, { createRef } from 'react';
import cx from 'classnames';
import Quill from 'quill';
import './index.global.scss';

interface Props {
  task?: string;
  placeholder?: string;
  className?: string;
  initContents?: any;
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

  initQuill = () => {
    const { initContents } = this.props;
    if (!this.editorRef.current) return;
    const { placeholder } = this.props;
    const quill = new Quill(this.editorRef.current, {
      placeholder,
      modules: {
        toolbar: false, // Snow includes toolbar by default
        // keyboard: { bindings },
      },
      theme: 'snow',
    });

    if (initContents) {
      quill.setContents(initContents);
    }

    this.quill = quill;
  };

  getContents = () => {
    const len = this.quill?.getLength() ?? 0;
    const contents = this.quill?.getContents(0, len);
    return JSON.parse(JSON.stringify(contents)) as any;
  };

  render() {
    const { className } = this.props;
    return (
      <div className={cx('md-editor', className)}>
        <div className="md-editor-inner" ref={this.editorRef} />
      </div>
    );
  }
}

export default Input;
