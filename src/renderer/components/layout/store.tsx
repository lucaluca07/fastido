import * as React from 'react';

interface IState {
  siders: number;
}

interface IAction {
  type: string;
  payload: any;
}

const LayoutContext = React.createContext<{
  state?: IState;
  dispatch?: React.Dispatch<IAction>;
}>({});

export const initialState = {
  siders: 0,
};

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'UPDATE_SIDERS':
      return { ...state, siders: action.payload };
    default:
      throw new Error();
  }
};

export default LayoutContext;
