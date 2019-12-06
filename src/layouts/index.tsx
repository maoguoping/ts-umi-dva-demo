import React, {useState, useEffect, useLayoutEffect} from 'react'
import './style.scss'
import { Layout, Breadcrumb, PageHeader, Button, Icon } from 'antd'
import HeadBar from '../components/module/headerBar'
import SideMenu from '../components/module/sideMenu'
import router from 'umi/router'
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { RouteComponentProps } from 'dva/router';
import { ConnectProps, ConnectState, Dispatch, AuthModelState, PageModelState } from '@/models/connect';
import LoadingPage from '../components/module/loadingPage'
const { Content, Sider } = Layout;
interface BasicLayoutProps extends ConnectProps, RouteComponentProps {
    auth: AuthModelState;
    page: PageModelState;
    location: any;
    dispatch: Dispatch;
    history: any;
    children: any[];
}
const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const { dispatch, auth, page } = props;
    const defaultValue: string[] = ['sub1','child1'];
    const [selectValue, setSelectValue] = useState<string[]>(['sub1','child1']);
    const [routeInfoReady, setRouteInfoReady] = useState<boolean>(true);
    const sideMenuList = page.sideMenuList;
    const innerPageList = page.innerPageList;
    const headPathNameList = [page.currentHeader.label];
    console.log('侧边菜单', page.currentSide)
    const sidePathNameList = page.currentSide.map((item: any) => item.label);
    const innerPathNameList = innerPageList.map((item: any) => item.label);
    const headerMenuList = page.headerMenuList;
    
    useLayoutEffect(() => {
        console.debug('setRouteInfoReady', auth.routeInfo)
        if(auth.routeInfo) {
            setRouteInfoReady(true);
        } else {
            setRouteInfoReady(false);
        }
    }, [auth.routeInfo])
    function changeTabMenu(e: any) {
        let {key} = e;
    }
    function changeSideMenu(e: any) {
        let {keyPath} = e;
        keyPath = keyPath.reverse();
        const sideList = sideMenuList;
        const firstSideValue = keyPath[0];
        const secondSideValue = keyPath[1];
        let firstSideLabel = null;
        let secondSideLabel = null;
        let target = null;
        for (const item of sideList) {
            if (item.value === firstSideValue) {
                firstSideLabel = item.label;
                for (const child of item.children) {
                    if (child.value === secondSideValue) {
                        secondSideLabel = child.label;
                        target = child.target
                        break;
                    }
                }
                break;
            }
        }
        setSelectValue(keyPath);
        console.debug('跳转的路由', target)
        router.push(target);
    }
    function onLogout() {
        dispatch({
            type: 'auth/logout',
            payload: {}
        });
    }
    function onBack () {
        props.history.goBack();
    }
    return (
        <Layout className="App mgp">
            <HeadBar list={headerMenuList} onChange={changeTabMenu} onLogout={onLogout}></HeadBar>
            <Layout className="main">
              {props.children}
            </Layout>
        </Layout>
    )
}
export default withRouter(connect(({auth, page}: ConnectState) => ({auth, page}))(BasicLayout));
