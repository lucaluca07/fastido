import * as React from 'react';

const Tasks: React.FC = () => {
  return (
    <div className="tasks">
      <header>Header</header>
      <main>
        <input type="text" placeholder="新增任务" />
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
