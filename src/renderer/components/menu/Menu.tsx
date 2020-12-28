import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import MenuContext, { reducer } from './store';

interface IProps {
  selectedKeys?: string[];
  openKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
  onSelectedKeysChange?: (selectedKeys: string[]) => void;
  onOpenKeysChange?: (openKeys: string[]) => void;
}

const Menu: React.FC<IProps> = ({
  children,
  selectedKeys,
  openKeys,
  defaultSelectedKeys = [],
  defaultOpenKeys = [],
  theme,
  style,
  onSelectedKeysChange,
  onOpenKeysChange,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    openKeys: openKeys || defaultOpenKeys,
    selectedKeys: selectedKeys || defaultSelectedKeys,
  });

  useEffect(() => {
    if (!selectedKeys) return;
    dispatch({ type: 'UPDATE_SELECTED_KEYS', payload: selectedKeys });
  }, [selectedKeys]);

  useEffect(() => {
    if (!openKeys) return;
    dispatch({ type: 'UPDATE_OPEN_KEYS', payload: openKeys });
  }, [openKeys]);

  useEffect(() => {
    onSelectedKeysChange?.(state.selectedKeys);
  }, [state.selectedKeys]);

  useEffect(() => {
    onOpenKeysChange?.(state.openKeys);
  }, [state.openKeys]);

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      <ul
        style={style}
        className={classNames('menu', { [`menu-${theme}`]: theme })}
      >
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

export default Menu;
