import React, { createRef } from 'react';
import cx from 'classnames';
import Quill from 'quill';
import './index.global.scss';
import Icon from '../icon';

interface Props {
  task?: string;
  placeholder?: string;
  className?: string;
  onEnter?: ({ text }: { text: string }) => void;
}

interface State {
  editing: boolean;
}
class Input extends React.Component<Props, State> {
  editorRef: React.RefObject<HTMLDivElement>;

  quill?: Quill;

  constructor(props: Props) {
    super(props);
    this.state = {
      editing: false,
    };
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
    if (!this.editorRef.current) return;
    const bindings = {
      enter: {
        key: 13,
        handler: () => {
          const { onEnter } = this.props;
          const text = this.quill?.getText();
          console.log('enter pressed', text);
          if (!text) return;
          onEnter?.({ text });
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

    this.quill = quill;

    quill.on('selection-change', (range) => {
      if (range) {
        this.setState({ editing: true });
        if (range.length === 0) {
          // console.log('User cursor is on', range.index);
        } else {
          // const text = quill.getText(range.index, range.length);
          // console.log('User has highlighted', text);
        }
      } else {
        this.setState({ editing: false });
        // console.log('Cursor not in the editor');
      }
    });
  };

  render() {
    const { editing } = this.state;
    const { className } = this.props;
    return (
      <div className={cx('input', className)}>
        <div className="task-input" ref={this.editorRef} />
      </div>
    );
  }
}

export default Input;
