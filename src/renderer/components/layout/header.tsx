import * as React from 'react';
import classNames from 'classnames';
// import LayoutContext from './context';

const Header: React.FC = ({ children }) => {
  const headerRef = React.createRef<HTMLHeadingElement>();
  React.useEffect(() => {
    if (headerRef.current) {
      const node = headerRef.current.querySelector('.layout-sider-switch');
      if (!node) return;
      console.log(11111);
    }
  }, [headerRef]);
  return (
    <header ref={headerRef} className={classNames('layout-header')}>
      {children}
    </header>
  );
};

export default Header;
