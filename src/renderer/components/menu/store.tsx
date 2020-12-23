import * as React from 'react';

interface IState {
  openKeys: string[];
  selectedKeys: string[];
}

interface IAction {
  type: string;
  payload: any;
}

const MenuContext = React.createContext<{
  state?: IState;
  dispatch?: React.Dispatch<IAction>;
}>({});

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_OPEN_KEYS':
      return { ...state, openKeys: action.payload };
    case 'UPDATE_SELECTED_KEYS':
      return { ...state, selectedKeys: action.payload };
    default:
      throw new Error();
  }
};

export default MenuContext;
