/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import MDEditor from '@/components/md-editor';

interface IProps {
  id: string;
  title: string;
  completed: boolean;
  selected: boolean;
  editing: boolean;
  updateTaskStatus: (id: string, completed: boolean) => void;
  onClick: (id: string) => void;
}

const Task: React.FC<IProps> = ({
  id,
  title,
  completed,
  updateTaskStatus,
  onClick,
  selected,
  editing,
}) => {
  const liRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const taskNode = liRef.current;
    if (!taskNode) return;
    const { height: prevHeight } = taskNode.getBoundingClientRect();
    taskNode.style.height = 'auto';
    const { height } = taskNode.getBoundingClientRect();
    console.log(prevHeight, height);
    taskNode.style.height = `${prevHeight}px`;
    taskNode.style.height = `${height}px`;
  }, [editing]);

  return (
    <li
      onClick={() => onClick(id)}
      ref={liRef}
      className={classNames('task', {
        'task-completed': completed,
        'task-selected': selected,
        'task-editing': editing,
      })}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className="task-drag">
        <i className="iconfont icon-drag" />
      </div>
      <div className="task-details">
        <div className="task-details-inner">
          <Checkbox
            checked={completed}
            onChange={(c) => {
              updateTaskStatus?.(id, c);
            }}
          />
          {editing ? (
            <Input ref={inputRef} placeholder="新建待办事项" />
          ) : (
            <span className="task-title">{title}</span>
          )}
        </div>
        {editing && <MDEditor placeholder="备注" />}
        {editing && (
          <div className="task-footer">
            <div>今天</div>
            <div>tag</div>
            <div>截止时间</div>
          </div>
        )}
      </div>
      <div className="task-mask" />
    </li>
  );
};

export default Task;
