import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <div>
      <div>404</div>
      <div
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={() => history.push('/')}
      >
        回首页
      </div>
    </div>
  );
};

export default NotFound;
