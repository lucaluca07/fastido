import React from 'react';
import classNames from 'classnames';
import { TaskUpdatePayload } from '@/reducer/tasks';
import Task from '../task';

interface IProps {
  tasks: { id: string; title: string; completed: boolean }[];
  selectedKey?: string;
  editingId?: string;
  updateTask: (params: TaskUpdatePayload) => void;
  onClick: (id: string) => void;
}
const Tasks: React.FC<IProps> = ({
  tasks,
  updateTask,
  onClick,
  selectedKey,
  editingId,
}) => {
  return (
    <ul className={classNames('task-list')}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          onClick={onClick}
          selected={selectedKey === String(task.id)}
          defaultEditing={editingId === String(task.id)}
          updateTask={updateTask}
          {...task}
        />
      ))}
    </ul>
  );
};

export default Tasks;
