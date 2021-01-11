import React from 'react';
import classNames from 'classnames';

interface IProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox: React.FC<IProps> = ({ onChange, checked }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames('checkbox', { 'checkbox-checked': checked })}>
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
