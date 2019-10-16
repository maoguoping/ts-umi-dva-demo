import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
interface DeviceListProps extends RouteComponentProps{}
const DeviceList: React.FC<DeviceListProps> = props => {
  return (
    <div>
    DeviceList
    </div>
  )
}
export default withRouter(connect()(DeviceList));