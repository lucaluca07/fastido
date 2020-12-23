import * as React from 'react';
import classNames from 'classnames';
import LayoutContext, { reducer, initialState } from './store';

const Layout: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      <section
        className={classNames('layout', { 'layout-horizontal': state.siders })}
      >
        {children}
      </section>
    </LayoutContext.Provider>
  );
};

export default Layout;
