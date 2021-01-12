import React, { FC } from 'react';
import Icon from '../icon';
import './index.global.scss';

const AddButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className="common-add-task">
      <Icon type="plus" />
    </button>
  );
};

export default AddButton;
