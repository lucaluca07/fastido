import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducer';
import { addTask, updateSelectedId } from '@/reducer/tasks';
import TasksComponent from '@/components/tasks';
import AddButton from '@/components/add';
import styles from './style.scss';

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, selectedId, editingId } = useSelector((state: RootState) => ({
    tasks: state.tasks.tasks,
    selectedId: state.tasks.selectedId,
    editingId: state.tasks.editingId,
  }));

  return (
    <div className={styles.tasks}>
      <header className={styles.header}>Header</header>
      <TasksComponent
        tasks={tasks}
        selectedKey={selectedId}
        editingId={editingId}
        updateTaskStatus={() => {}}
        onClick={(id) => {
          dispatch(updateSelectedId(id));
        }}
      />
      <AddButton
        onClick={() => {
          dispatch(addTask({ title: '', editing: true }));
        }}
      />
    </div>
  );
};

export default Tasks;
