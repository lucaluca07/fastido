import React from 'react';
import classNames from 'classnames';

interface IProps {
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox: React.FC<IProps> = ({ onChange, onClick, checked }) => {
  return (
    // eslint-disable-next-line
    <label
      onClick={onClick}
      className={classNames('checkbox', { 'checkbox-checked': checked })}
    >
      <span className="checkbox-inner" />
      <input
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        type="checkbox"
      />
    </label>
  );
};

export default Checkbox;
