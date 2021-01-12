import React from 'react';
import classNames from 'classnames';
import Task from '../task';

interface IProps {
  tasks: { id: string; title: string; completed: boolean }[];
  selectedKey?: string;
  editingId?: string;
  updateTaskStatus: (id: string, completed: boolean) => void;
  onClick: (id: string) => void;
}
const Tasks: React.FC<IProps> = ({
  tasks,
  updateTaskStatus,
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
          editing={editingId === String(task.id)}
          updateTaskStatus={updateTaskStatus}
          {...task}
        />
      ))}
    </ul>
  );
};

export default Tasks;
