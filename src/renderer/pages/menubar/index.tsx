import React from 'react';
import Calendar from '@/components/calendar';
import styles from './style.scss';

const Menubar = () => {
  return (
    <div className={styles.menubar}>
      <Calendar type="card" theme="dark" />
    </div>
  );
};

export default Menubar;
