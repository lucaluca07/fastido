import * as React from 'react';
import classNames from 'classnames';
import LayoutContext from './store';

const Sider: React.FC<{ theme?: 'dark' | 'light' }> = ({
  children,
  theme = 'dark',
}) => {
  const { state, dispatch } = React.useContext(LayoutContext);
  const cache = React.useRef<boolean>();
  React.useEffect(() => {
    if (cache.current) return;
    cache.current = true;
    dispatch?.({ type: 'UPDATE_SIDERS', payload: (state?.siders || 0) + 1 });
  }, [dispatch, state]);

  return (
    <aside
      className={classNames('layout-sider', {
        'layout-dark-sider': theme === 'dark',
      })}
    >
      {children}
    </aside>
  );
};

export default Sider;
