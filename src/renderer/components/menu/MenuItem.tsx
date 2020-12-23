import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import menuContext from './store';

interface IProps {
  prefix?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (eventKey: string) => void;
  eventKey: string;
}

const MenuItem: React.FC<IProps> = ({ prefix, after, children, eventKey }) => {
  const { state, dispatch } = useContext(menuContext);
  const isActive = useMemo(() => {
    return state?.selectedKeys.includes(eventKey);
  }, [state?.selectedKeys, eventKey]);
  return (
    <li
      onClick={() => {
        if (isActive) return;
        dispatch?.({ type: 'UPDATE_SELECTED_KEYS', payload: [eventKey] });
      }}
      className={classNames('menu-item', {
        'menu-item-active': isActive,
      })}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
    >
      {prefix}
      {children}
      {after}
    </li>
  );
};

export default MenuItem;
