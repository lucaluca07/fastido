import Input from '@/components/input';
import React from 'react';
import styles from './style.scss';

const Tasks: React.FC = () => {
  return (
    <div className={styles.tasks}>
      <div className={styles.content}>
        <header className={styles.header}>Header</header>
        <div className={styles['task-list']}>
          <Input />
        </div>
      </div>
      <div className={styles['task-detail']}>right</div>
    </div>
  );
};

export default Tasks;
