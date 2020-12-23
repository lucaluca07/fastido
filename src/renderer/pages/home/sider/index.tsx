import React from 'react';
import Calendar from '@/components/calendar';
import styles from './style.scss';

const Sider = () => {
  return (
    <div className={styles.sider}>
      <Calendar theme="dark" type="card" />
    </div>
  );
};

export default Sider;
