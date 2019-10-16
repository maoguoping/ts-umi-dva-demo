import styles from './index.scss'
import { formatMessage } from 'umi-plugin-locale'
import React from 'react'
import Redirect from 'umi/redirect';
const APP: React.FC = (props: any) => {
  return (
    <Redirect to="/manageCenter/userList"></Redirect>
  );
}
export default APP;


