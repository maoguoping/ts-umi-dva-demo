import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
interface RoleListProps extends RouteComponentProps{}
const RoleList: React.FC<RoleListProps> = props => {
  return (
    <div>
    RoleList
    </div>
  )
}
export default withRouter(connect()(RoleList));
