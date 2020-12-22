import classnames from 'classnames';
import * as React from 'react';

export interface IconProps {
  type: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const Icon: React.SFC<IconProps> = ({ type, onClick, className }) => {
  const classString = classnames('iconfont', className, {
    [`icon-${type}`]: !!type,
  });

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <i
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      className={classString}
      onClick={onClick}
    />
  );
};
export default Icon;
