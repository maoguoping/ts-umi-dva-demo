import React, {useState, useEffect, useLayoutEffect} from 'react'
import './style.scss'
import { Layout, Button, Icon } from 'antd'
import router from 'umi/router'
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { RouteComponentProps } from 'dva/router';
import { ConnectProps, ConnectState, Dispatch, AuthModelState, PageModelState } from '@/models/connect';
import LoadingPage from '../../components/module/loadingPage'
const { Content, Sider, Footer } = Layout;
interface IndexProps extends ConnectProps, RouteComponentProps {
    auth: AuthModelState;
    page: PageModelState;
    location: any;
    dispatch: Dispatch;
    history: any;
}
const Index: React.FC<IndexProps> = props => {
    return (
        <Layout className="Index">
            <Content>首页</Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}
export default withRouter(connect(({auth, page}: ConnectState) => ({auth, page}))(Index));
