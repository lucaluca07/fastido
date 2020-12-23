import * as React from 'react';
import classNames from 'classnames';
// import LayoutContext from './context';

const Content: React.FC = ({ children }) => {
  // const { siders, updateSiders } = React.useContext(LayoutContext);
  // React.useEffect(() => {
  //   updateSiders?.((siders || 0) + 1);
  // }, [siders, updateSiders]);

  return <main className={classNames('layout-content')}>{children}</main>;
};

export default Content;
