import React from 'react';

const MenuGroup: React.FC = ({ children }) => {
  return (
    <li className="menu-group">
      <ul className="menu">{children}</ul>
    </li>
  );
};

export default MenuGroup;
