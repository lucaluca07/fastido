import classnames from 'classnames';
import * as React from 'react';
import Icon from '../icon';

import './checkbox.global.scss';

export interface CheckBoxProps {
  className?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  onChange?: (checked: boolean) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.MouseEventHandler<HTMLElement>;
}

const CheckBox: React.SFC<CheckBoxProps> = ({
  className,
  value,
  checked,
  defaultChecked = false,
  children,
  disabled,
  onChange,
}) => {
  const [isChecked, setChecked] = React.useState<boolean>(
    checked === undefined ? defaultChecked : checked
  );

  const classString = classnames(className, 't-checkbox', {
    't-checkbox-disabled': disabled,
    't-checkbox-checked': isChecked,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classString}>
      <input
        className="t-input"
        onChange={(e) => {
          if (onChange) onChange(e.target.checked);
        }}
        onClick={() => {
          setChecked(!isChecked);
        }}
        checked={!!isChecked}
        value={value}
        type="checkbox"
      />
      <Icon
        className="t-checkbox-inner"
        type={isChecked ? 'checked' : 'unchecked'}
      />
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

export default CheckBox;
