import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
interface DeviceEventsListProps extends RouteComponentProps{}
const DeviceEventsList: React.FC<DeviceEventsListProps> = props => {
  return (
    <div>
    DeviceEventsList
    </div>
  )
}
export default withRouter(connect()(DeviceEventsList));
