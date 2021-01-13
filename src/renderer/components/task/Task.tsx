/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import MDEditor from '@/components/md-editor';
import { TaskUpdatePayload } from '@/reducer/tasks';

interface IProps {
  id: string;
  title: string;
  completed: boolean;
  selected: boolean;
  defaultEditing: boolean;
  onSave?: () => void;
  updateTask: (params: TaskUpdatePayload) => void;
  onClick: (id: string) => void;
}

const Task: React.FC<IProps> = ({
  id,
  title,
  completed,
  updateTask,
  onClick,
  onSave,
  selected,
  defaultEditing = false,
}) => {
  const liRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<Input>(null);
  const [editing, setEditing] = useState(defaultEditing);

  useEffect(() => {
    inputRef.current?.focus();
    const taskNode = liRef.current;
    if (!taskNode) return;
    const { height: prevHeight } = taskNode.getBoundingClientRect();
    taskNode.style.height = 'auto';
    let { height } = taskNode.getBoundingClientRect();
    if (prevHeight > height) height = 33;
    taskNode.style.height = `${prevHeight}px`;
    taskNode.style.height = `${height}px`;
  }, [editing]);

  useEffect(() => {
    if (!editing) return () => {};
    const handleClick = (e: MouseEvent) => {
      const node = e.target;
      if (!(liRef.current === node || liRef.current?.contains(node as Node))) {
        setTimeout(() => {
          setEditing(false);
        }, 100);

        onSave?.();
      }
    };
    window.addEventListener('click', handleClick, false);
    return () => window.removeEventListener('click', handleClick);
  }, [editing, onSave]);

  useEffect(() => {
    if (!selected) return () => {};
    const handleClick = (e: MouseEvent) => {
      const node = e.target;
      if (!(liRef.current === node || liRef.current?.contains(node as Node))) {
        onClick?.('');
      }
    };
    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick);
  }, [onClick, selected]);

  return (
    <li
      onClick={() => {
        onClick(id);
      }}
      onDoubleClick={() => {
        setEditing(true);
      }}
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
              updateTask?.({ id, completed: c });
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
            项目
            <div>tag</div>
            <div>截止时间</div>
          </div>
        )}
      </div>
    </li>
  );
};

export default Task;
