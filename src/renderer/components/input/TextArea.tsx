import classnames from 'classnames';
import * as React from 'react';
import './textarea.global.scss';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  autosize?: boolean;
}

export interface TextAreaState {
  textAreaStyles?: React.CSSProperties;
  resizing?: boolean;
}

export default class TextArea extends React.Component<
  TextAreaProps,
  TextAreaState
> {
  public textArea: HTMLTextAreaElement | undefined;

  public constructor(props: TextAreaProps) {
    super(props);
    this.state = {
      textAreaStyles: {},
      resizing: false,
    };
  }

  public componentDidMount() {
    this.resizeTextarea();
  }

  public componentDidUpdate(prevProps: TextAreaProps) {
    // Re-render with the new content then recalculate the height as required.
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.resizeTextarea();
    }
  }

  public saveTextarea = (node: HTMLTextAreaElement) => {
    this.textArea = node;
  };

  public handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  public resizeTextarea = () => {
    const { autosize } = this.props;
    if (!autosize || !this.textArea) {
      return;
    }

    let height = this.textArea.scrollHeight;
    const style = window.getComputedStyle(this.textArea);

    const boxSizing =
      style.getPropertyValue('box-sizing') ||
      style.getPropertyValue('-moz-box-sizing') ||
      style.getPropertyValue('-webkit-box-sizing');

    const paddingSize =
      parseFloat(style.getPropertyValue('padding-bottom')) +
      parseFloat(style.getPropertyValue('padding-top'));

    const borderSize =
      parseFloat(style.getPropertyValue('border-bottom-width')) +
      parseFloat(style.getPropertyValue('border-top-width'));

    if (boxSizing === 'border-box') {
      // border-box: add border, since height = content + padding + border
      height += borderSize;
    } else if (boxSizing === 'content-box') {
      // remove padding, since height = content
      height -= paddingSize;
    }

    const textAreaStyles = { height };
    this.setState({ textAreaStyles, resizing: true }, () => {
      this.setState({ resizing: false });
    });
  };

  public focus = () => {
    this.textArea?.focus();
  };

  public blur = () => {
    this.textArea?.blur();
  };

  public render() {
    const { style, className, ...otherProps } = this.props;
    otherProps.autosize = undefined;
    const { textAreaStyles, resizing } = this.state;
    const classString = classnames('l-textarea', className);

    const finalStyle = {
      ...style,
      ...textAreaStyles,
      ...(resizing ? { overflow: 'hidden' } : null),
    };

    return (
      <textarea
        className={classString}
        style={finalStyle}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref={this.saveTextarea}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    );
  }
}
