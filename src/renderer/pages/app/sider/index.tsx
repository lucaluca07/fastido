import React from 'react';
import Calendar from '@/components/calendar';
import Menu, { MenuGroup, MenuItem } from '@/components/menu';
import Icon from '@/components/icon';
import { useHistory } from 'react-router-dom';
import styles from './style.scss';

const menus = [
  {
    key: 'main',
    menus: [
      { key: '/', label: '收件箱', icon: 'inbox' },
      { key: 'calendar', label: '日历', icon: 'calendar' },
      { key: 'tags', label: '标签', icon: 'tag1' },
    ],
  },
  {
    key: 'more',
    menus: [
      { key: 'completed', label: '已完成', icon: 'checkbox' },
      { key: 'trash', label: '垃圾桶', icon: 'dustbin' },
    ],
  },
];

const Sider = () => {
  const history = useHistory();
  const handleSelectedKeysChange = (selectedKeys: string[]) => {
    const path = selectedKeys?.[0];
    history.push(path);
  };
  return (
    <div className={styles.sider}>
      <Calendar theme="dark" type="card" />
      <Menu
        onSelectedKeysChange={handleSelectedKeysChange}
        style={{
          padding: '0 16px',
          borderTop: '1px solid #333',
          marginTop: 16,
        }}
        theme="dark"
      >
        {menus.map((item) => (
          <MenuGroup key={item.key}>
            {item.menus.map(({ label, key, icon }) => (
              <MenuItem key={key} eventKey={key}>
                <div className={styles['menu-item']}>
                  <Icon className={styles.iconfont} type={icon} />
                  <span>{label}</span>
                </div>
              </MenuItem>
            ))}
          </MenuGroup>
        ))}
      </Menu>
    </div>
  );
};

export default Sider;
