import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
interface RightListProps extends RouteComponentProps{}
const RightList: React.FC<RightListProps> = props => {
  return (
    <div>
    RightList
    </div>
  )
}
export default withRouter(connect()(RightList));
