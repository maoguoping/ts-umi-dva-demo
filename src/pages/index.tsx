import Redirect from 'umi/redirect'
import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react'
import './style.scss'
import { Layout, Breadcrumb, PageHeader, Button, Icon } from 'antd'
import HeadBar from '../components/module/headerBar'
import router from 'umi/router'
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { RouteComponentProps } from 'dva/router';
import { ConnectProps, ConnectState, Dispatch, AuthModelState, PageModelState } from '@/models/connect';
import LoadingPage from '../components/module/loadingPage'
interface AppProps extends ConnectProps, RouteComponentProps {
  auth: AuthModelState;
  page: PageModelState;
  location: any;
  dispatch: Dispatch;
  history: any;
  children: any[];
}
const App: React.FC<AppProps> = props => {
  const { dispatch, auth, page } = props;
  const [routeInfoReady, setRouteInfoReady] = useState<boolean>(true);
  const headerMenuList = page.headerMenuList;
  const pathname = location.pathname;
  useLayoutEffect(() => {
      console.debug('setRouteInfoReady', auth.routeInfo)
      if(auth.routeInfo) {
          setRouteInfoReady(true);
      } else {
          setRouteInfoReady(false);
      }
  }, [auth.routeInfo])
  const changeTabMenu = useCallback((target: string) => {
      console.debug('菜单点击', target)
      if (target === '/manageCenter') {
        router.push('/manageCenter/userList');
      } else {
        router.push(target);
      }
  }, [])
  const onLogout = useCallback(() => {
      dispatch({
          type: 'auth/logout',
          payload: {}
      });
  }, [dispatch])
  return (
      <Layout className="App">
          {pathname !== '/login' && <HeadBar list={headerMenuList} onChange={changeTabMenu} onLogout={onLogout}></HeadBar>} 
          <Layout className="main">
            {props.children}
          </Layout>
      </Layout>
  )
}
export default withRouter(connect(({auth, page}: ConnectState) => ({auth, page}))(App));


