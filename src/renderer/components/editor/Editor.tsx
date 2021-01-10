import * as React from 'react';
import CheckBox from '../checkbox';
import Icon from '../icon';
import Input from '../input';
import './editor.global.scss';

const { TextArea } = Input;

export default class Task extends React.Component {
  private input: Input | undefined;

  public componentDidMount() {
    this.input?.focus();
  }

  private saveInput = (el: Input) => {
    this.input = el;
  };

  public render() {
    return (
      <div className="l-editor">
        <div className="l-editor-input-wrapper">
          <CheckBox />
          <Input
            value="123"
            ref={this.saveInput}
            placeholder="新增任务"
            className="l-editor-input"
          />
        </div>
        <TextArea
          autosize
          placeholder="备注"
          style={{
            resize: 'none',
            border: 'none',
            boxShadow: 'none',
            marginLeft: 14,
          }}
        />
        <div className="l-editor-footer">
          <div className="l-editor-other">
            <span>今天</span>
            <ul className="l-editor-tags">
              <li className="l-editor-tag">tag1</li>
              <li className="l-editor-tag">tag2</li>
              <li className="l-editor-tag">tag3</li>
              <li className="l-editor-tag">增加标签</li>
            </ul>
          </div>
          <ul className="l-editor-settings">
            <li>
              <Icon type="calendar" />
            </li>
            <li>
              <Icon type="tag" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
