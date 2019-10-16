import React from 'react';
import styles from './index.scss';

const BasicLayout: React.FC = props => {
  return (
    <div className="BasicLayout">
      {props.children}
    </div>
  );
};

export default BasicLayout;
