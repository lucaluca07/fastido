import React, { createRef } from 'react';
import Quill from 'quill';
import './index.global.scss';
import Icon from '../icon';

interface Props {
  task?: string;
}

interface State {
  editing: boolean;
}
class Input extends React.Component<Props, State> {
  editorRef: React.RefObject<HTMLDivElement>;

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

  initQuill = () => {
    if (!this.editorRef.current) return;
    const bindings = {
      enter: {
        key: 13,
        handler() {
          // console.log('enter pressed');
        },
      },
    };
    const quill = new Quill(this.editorRef.current, {
      placeholder: '添加任务',
      modules: {
        toolbar: false, // Snow includes toolbar by default
        keyboard: { bindings },
      },
      theme: 'snow',
    });

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
    return (
      <div className="input">
        <div className="task-input" ref={this.editorRef} />
        {editing && (
          <>
            <Icon type="calendar" />
            <Icon type="arrow-down-filling" />
          </>
        )}
      </div>
    );
  }
}

export default Input;
