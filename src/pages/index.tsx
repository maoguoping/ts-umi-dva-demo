import './index.scss'
import React from 'react'
import Redirect from 'umi/redirect'
const APP: React.FC = (props: any) => {
  return (
    <Redirect to="/manageCenter/userList"></Redirect>
  );
}
export default APP;


