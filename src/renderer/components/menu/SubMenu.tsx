import React, { useContext, useMemo, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import menuContext from './store';

interface SubMenuProps {
  title: React.ReactNode;
  eventKey: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ title, children, eventKey }) => {
  const { state, dispatch } = useContext(menuContext);
  const [visible, setVisible] = useState(state?.openKeys?.includes(eventKey));
  const isOpen = useMemo(() => {
    return state?.openKeys?.includes(eventKey);
  }, [state?.openKeys, eventKey]);

  const menuRef = useRef<HTMLUListElement>(null);
  // 缓慢展开收起的动画
  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
      menuRef?.current?.setAttribute('style', '');
    }, 300);
    if (!menuRef.current) return;
    const el = menuRef.current;
    el.style.display = 'block';
    el.style.height = 'auto';
    const { height } = window.getComputedStyle(el);
    if (isOpen) {
      el.style.height = '0';
      setTimeout(() => {
        el.style.height = height;
        el.style.opacity = '1';
      }, 0);
    } else {
      el.style.height = height;
      setTimeout(() => {
        el.style.height = '0px';
        el.style.opacity = '0';
      }, 0);
    }
  }, [isOpen]);

  return (
    <li
      className={classNames('menu-submenu', {
        'menu-submenu-open': isOpen,
      })}
    >
      <div
        onClick={() => {
          dispatch?.({
            type: 'UPDATE_OPEN_KEYS',
            payload: isOpen
              ? state?.openKeys.filter((key) => key !== eventKey)
              : [...(state?.openKeys || []), eventKey],
          });
        }}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        className={classNames('menu-submenu-title')}
      >
        <i className="menu-submenu-arrow" />
        <span>{title}</span>
      </div>
      <ul
        ref={menuRef}
        className={classNames('menu', { 'menu-hidden': !visible })}
      >
        {children}
      </ul>
    </li>
  );
};

export default SubMenu;
