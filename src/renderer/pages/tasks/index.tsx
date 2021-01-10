import * as React from 'react';
import Editor from '@/components/editor';

const Tasks: React.FC = () => {
  return (
    <div className="tasks">
      <header>Header</header>
      <main>
        <Editor />
        <div>
          未完成
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
        <div>
          已完成
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
